import express from 'express';
import { Request, Response } from 'express';

import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from "uuid";
import User from '../../models/User';
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
      const destPath = path.join(__dirname, '../../public/uploads');
      cb(null, destPath);
    },
    filename: function (req: any, file: any, cb: any) {
      const fileExtension = file.originalname.split('.').pop(); // Extraction de l'extension du fichier
      cb(null, `${uuidv4()}.${fileExtension}`) // Génération du nom de fichier avec UUID
    }
  })

const upload = multer({ storage: storage })

// Route pour télécharger un nouveau fichier
router.post('/', upload.single('file'), (req: Request & { file?: Express.Multer.File }, res: Response) => {
    // Vérifie si le fichier a été téléchargé avec succès
  if (req.file ) {
    res.json({
      message: 'Fichier téléchargé avec succès',
      fileName: req.file.filename // Envoie le nom du fichier dans la réponse
    });
  } else {
    res.status(400).json({ message: 'Erreur lors du téléchargement du fichier' });
  }
});


// Route pour télécharger un nouveau avatar
router.post('/avatar/:id', upload.single('file'), async (req: Request & { file?: Express.Multer.File }, res: Response) => {
  if (!req.is("multipart/form-data")) {
    return res
      .status(400)
      .json({
        message: "Content-Type doit être multipart/form-data",
        result: false,
      });
  }
  // Vérifie si le fichier a été téléchargé avec succès
  if (req.file) {
    // Envoie le nom du fichier dans la réponse
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { avatar: req.file.filename },
      { new: true }
    );
    res.json({
      message: "Avatar modifié avec succès",
      user: user,
      result: true,
      fileName: req.file.filename,
    });
  } else {
    res
      .status(400)
      .json({
        message: "Erreur lors du téléchargement du fichier",
        result: false,
      });
  }
});


export default router;
