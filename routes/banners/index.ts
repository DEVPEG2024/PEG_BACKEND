import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';
import { getBanners, createBanner, updateBanner, updateBannerStatus, deleteBanner } from '../../controllers/banners/banner.controller';


// Banner
router.get('/', authMiddleware, getBanners);
router.post('/create', authMiddleware, createBanner);
router.put('/edit/:id', authMiddleware, updateBanner);
router.put('/update-status/:id', authMiddleware, updateBannerStatus);
router.delete('/delete/:id', authMiddleware, deleteBanner);

export default router;
