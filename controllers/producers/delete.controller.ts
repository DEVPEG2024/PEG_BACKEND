import { Request, Response } from 'express';
import User from '../../models/User';
import CategoryProducer from '../../models/CategoryProducer';



// Delete producer
export const deleteProducer = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await User.findByIdAndDelete(data.id);
    if (user) {
      const category = await CategoryProducer.findById(user.category);
      if (category) {
        category.producers = category.producers.filter(
          (producer) => producer.toString() !== user._id.toString()
        );
        await category.save();
      }
      return res.status(200).json({
        result: true,
        message: "Producteur supprimé avec succès",
        user,
      });
    }
    res.status(404).json({
      result: false,
      message: "Producteur non trouvé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression du producteur",
      error,
    });
  }
};
