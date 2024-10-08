import { Request, Response } from 'express';
import FormAnswer from '../../models/formAnswers';

// Create new formAnswer
export const createFormAnswer = async (req: Request, res: Response) => {
    try {
        const { formId, fields } = req.body;
        const newFormAnswer = new FormAnswer({
          formId,
          fields,
        });
        const savedFormAnswer = await newFormAnswer.save();
        res.status(201).json({ result: true, message: 'Réponse créée', formAnswer: savedFormAnswer });
      } catch (error) {
        console.log(error);
        res.status(400).json({ result: false, message: 'Erreur lors de la création de la réponse', error });
      }
};

// Update formAnswer
export const updateFormAnswer = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        const { title, fields } = req.body;
        const updatedFormAnswer = await FormAnswer.findByIdAndUpdate(id, { title, fields }, { new: true });
        res.json({ result: true, message: 'Réponse modifiée avec succès', form: updatedFormAnswer });
      } catch (error) {
        res.status(500).json({ result: false, message: 'Erreur lors de la modification de la réponse', error: (error as Error).message });
      }
};

// Delete formAnswer
export const deleteFormAnswer = async (req: Request, res: Response) => { 
    try {
        const { id } = req.params;
        await FormAnswer.findByIdAndDelete(id);
        res.json({ result: true, message: 'Réponse supprimée avec succès' });
      } catch (error) {
        res.status(500).json({ result: false, message: 'Erreur lors de la suppression de la réponse', error: (error as Error).message });
      }
};
