import { Request, Response } from 'express';
import Form from '../../models/forms';

// Create new formAnswer
export const createFormAnswer = async (req: Request, res: Response) => {
    try {
        const { formId, fields } = req.body;
        const newFormAnswer = new FormAnswer({
          formId,
          fields,
        });
        const savedForm = await newFormAnswer.save();
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
