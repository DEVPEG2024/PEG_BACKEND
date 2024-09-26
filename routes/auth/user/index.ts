// update user
import express from 'express';
import User from '../../../models/User';
import { compare, hash } from 'bcryptjs';

const router = express.Router();
router.put('/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const  user  = req.body;
      console.log(user);
      const upadatedUser = await User.findByIdAndUpdate(id, user, { new: true });
      res.json({ result: true, message: 'Utilisateur modifié avec succès', user: upadatedUser });
    } catch (error) {
      res.status(500).json({ result: false, message: "Erreur lors de la modification de l'utilisateur", error: (error as Error).message });
    }
  });

  // update user avatar
  router.put('/update/avatar/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { avatar } = req.body;
      const upadatedUser = await User.findByIdAndUpdate(id, { avatar }, { new: true });
      res.json({ result: true, message: 'Avatar modifié avec succès', user: upadatedUser });
    } catch (error) {
      res.status(500).json({ result: false, message: "Erreur lors de la modification de l'avatar", error: (error as Error).message });
    }
  });

  // update user password
  router.put('/password/:id', async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.json({ message: "Utilisateur non trouvé", result: false });
      }
      // Vérifier si l'ancien mot de passe correspond
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        return res.json({ message: "L'ancien mot de passe ne correspond pas", result: false });
      }
      user.password = newPassword;
      await user.save();
      res.json({ message: "Modification du mot de passe réussie", result: true });
    } catch (error) {
      console.log(error);
      res.json({ message: "Erreur lors de la modification du mot de passe", result: false });
    }
  });
  export default router;
