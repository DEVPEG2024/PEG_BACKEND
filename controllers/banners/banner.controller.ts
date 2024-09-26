import { Request, Response } from 'express';
import Banner from '../../models/banner';


// Get all tickets 
export const getBanners = async (req: Request, res: Response) => {
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

    const banners = await Banner.find(searchQuery)
      .skip(skip)
      .limit(pageSize);
    
    console.log(banners)
    const total = await Banner.countDocuments(searchQuery);

    res.json({
      result: true,
      banners,
      total,
      message: 'Banners récupérées avec succès'
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      result: false,
      message: 'Erreur lors de la récupération des banners',
      error: (error as Error).message
    });
  }
};


// Create new banner
export const createBanner = async (req: Request, res: Response) => {
  try {
    const { banner } = req.body;
    console.log(banner)
    const newBanner = new Banner({
      ref: banner.ref,
      title: banner.title,
      customer: banner.customer || null,
      customerCategory: banner.customerCategory || null,
      image: banner.image,
      link: banner.link,
      status: banner.status,
    });
      await newBanner.save();
    res.status(201).json({
      result: true,
      banner: newBanner,
      message: "Banner créé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la création du banner",
      error,
    });
  }
};

// Update ticket
export const updateBanner = async (req: Request, res: Response) => { 
  try {
    const { id } = req.params;
    const { banner } = req.body;
    const updatedBanner = await Banner.findByIdAndUpdate(id, banner, { new: true });
    if (!updatedBanner) {
      return res.status(404).json({
        result: false,
        message: "Banner non trouvé",
      });
    }
    res.status(200).json({
      result: true,
      banner: updatedBanner,
      message: "Banner mise à jour",
    });
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la mise à jour du banner",
      error,
    });
  }
};

// Delete banner
export const deleteBanner = async (req: Request, res: Response) => { 
  try {
    const { id } = req.params;
    console.log(id)
    const deletedBanner = await Banner.findByIdAndDelete(id);
    if (!deletedBanner) {
      return res.status(404).json({
        result: false,
        message: "Banner non trouvé",
      });
    }   
    res.status(200).json({
      result: true,
      bannerId: id,
      message: "Banner supprimé",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: false,
      message: "Erreur lors de la suppression du banner",
      error,
    });
  }
};

// Update banner status
export const updateBannerStatus = async (req: Request, res: Response) => { 
  try {
    const { bannerId, status, priority } = req.body;
    const updatedBanner = await Banner.findByIdAndUpdate(bannerId, { status, priority }, { new: true });
    if (!updatedBanner) {
      return res.status(404).json({
        result: false,
        message: "Banner non trouvé",
      });
    }
    res.status(200).json({
      result: true,
      bannerId: bannerId,
      banner: updatedBanner,
      message: "Statut du banner mis à jour",
    });   
  } catch (error) {
    res.status(500).json({
      result: false,
      message: "Erreur lors de la mise à jour du statut du banner",
      error,
    });
  }
};
