import express from 'express';
import Offer from '../../models/offer';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { ref, title, customer, form, images, description, price, isAvailable, startDate, endDate } = req.body;
    delete req.body._id;
    const newOffer = new Offer({
      ref,
      title,
      customer,
      form,
      images,
      description,
      price,
      isAvailable,
      startDate,
      endDate,
    });
    const savedOffer = await newOffer.save();
    res.status(201).json({ result: true, message: 'Offre créée', offer: savedOffer });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: false, message: 'Erreur lors de la création de l\'offre', error });
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

    const offers = await Offer.find(searchQuery)     
    .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(pageSize);
    
   
    const total = await Offer.countDocuments(searchQuery);

    res.json({
      result: true,
      offers,
      total,
      message: 'Offres récupérées avec succès'
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des offres',
      error: (error as Error).message
    });
  }
});


// delete form
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Offer.findByIdAndDelete(id);
    res.json({ result: true, message: 'Offre supprimée avec succès', offer: null });
  } catch (error) {
    res.status(500).json({ result: false, message: 'Erreur lors de la suppression de l\'offre', error: (error as Error).message });
  }
});

// update offer
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data= req.body;
    console.log(data);
    const updatedOffer = await Offer.findByIdAndUpdate(id, data, { new: true });
    res.json({ result: true, message: 'Offre modifiée avec succès', offer: updatedOffer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ result: false, message: 'Erreur lors de la modification de l\'offre', error: (error as Error).message });
  }
});




export default router;
