import express from 'express';
import Form from '../../models/forms';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { title, fields } = req.body;
    const newForm = new Form({
      title,
      fields,
    });
    const savedForm = await newForm.save();
    res.status(201).json({ result: true, message: 'Form créé', form: savedForm });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: false, message: 'Erreur lors de la création du form', error });
  }
});


router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const searchTerm = req.query.searchTerm as string || "";

    const skip = (page - 1) * pageSize;

    const searchQuery = {
      ...(searchTerm
        ? {
            $or: [
              { title: { $regex: searchTerm, $options: "i" } },
            ],
          }
        : {}),
    };

    const forms = await Form.find(searchQuery)     
    .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Form.countDocuments(searchQuery);

    res.json({
      result: true,
      forms,
      total,
      message: 'Formulaires récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des formulaires',
      error: (error as Error).message
    });
  }
});


// delete form
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Form.findByIdAndDelete(id);
    res.json({ result: true, message: 'Formulaires supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ result: false, message: 'Erreur lors de la suppression du formulaire', error: (error as Error).message });
  }
});

// update form
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, fields } = req.body;
    const updatedForm = await Form.findByIdAndUpdate(id, { title, fields }, { new: true });
    res.json({ result: true, message: 'Formulaires modifié avec succès', form: updatedForm });
  } catch (error) {
    res.status(500).json({ result: false, message: 'Erreur lors de la modification du formulaire', error: (error as Error).message });
  }
});
export default router;
