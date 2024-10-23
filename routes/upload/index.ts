import express from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from '../../config/cloudinaryConfig';
import streamifier from 'streamifier';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage })

const uploadToCloudinary = async (buffer: Buffer) : Promise<CloudinaryUploadResult>=> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result: CloudinaryUploadResult) => {
      if (error) return reject(error);
      resolve(result as CloudinaryUploadResult);
    });
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
}

// Route pour télécharger un nouveau fichier
router.post('/', upload.single('file'), async (req: Request & { file?: Express.Multer.File }, res: Response) => {
  if (req.file) {
    try {
      const result: CloudinaryUploadResult = await uploadToCloudinary(req.file.buffer); // Upload depuis le buffer
      res.json({
        message: 'Fichier téléchargé avec succès',
        fileUrl: result.secure_url, // Envoie l'URL du fichier stocké sur Cloudinary
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de l\'upload à Cloudinary', error });
    }
  } else {
    res.status(400).json({ message: 'Erreur lors du téléchargement du fichier' });
  }
});

router.delete('/delete/:public_id', async (req: Request, res: Response) => {
  const public_id: string = req.params.public_id;
  
  try {
    await cloudinary.uploader.destroy(public_id); // Supprime le fichier sur Cloudinary via son `public_id`
    res.json({ message: 'Fichier supprimé avec succès' });
  } catch (error) {
    res.status(400).json({
      message: 'Erreur lors de la suppression du fichier sur Cloudinary.',
      error: (error as Error).message,
    });
  }
});

export default router;
