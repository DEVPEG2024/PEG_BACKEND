import { Request, Response } from 'express';
import Form from '../../models/forms';

// Get all forms 
export const getForms = async (req: Request, res: Response) => {
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
};

// Create new form
export const createForm = async (req: Request, res: Response) => {
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
};

// Update form
export const updateForm = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const { title, fields } = req.body;
        const updatedForm = await Form.findByIdAndUpdate(id, { title, fields }, { new: true });
        res.json({ result: true, message: 'Formulaires modifié avec succès', form: updatedForm });
      } catch (error) {
        res.status(500).json({ result: false, message: 'Erreur lors de la modification du formulaire', error: (error as Error).message });
      }
};

// Delete form
export const deleteForm = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        await Form.findByIdAndDelete(id);
        res.json({ result: true, message: 'Formulaires supprimé avec succès' });
      } catch (error) {
        res.status(500).json({ result: false, message: 'Erreur lors de la suppression du formulaire', error: (error as Error).message });
      }
};
