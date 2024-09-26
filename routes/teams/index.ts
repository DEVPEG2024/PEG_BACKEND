import express from 'express';
const router = express.Router();
import authMiddleware from '../../middleware/authMiddleware';

import { getTeams } from '../../controllers/teams/find.controller';
import { createTeam } from '../../controllers/teams/create.controller';
import { updateTeam } from '../../controllers/teams/update.controller';
import { updateTeamStatus } from '../../controllers/teams/update.controller';
import { deleteTeam } from '../../controllers/teams/delete.controller';

// Team
router.get('/admin/', authMiddleware, getTeams);
router.post('/admin/create', authMiddleware, createTeam);
router.put('/admin/edit', authMiddleware, updateTeam);
router.put('/admin/update-status', authMiddleware, updateTeamStatus);
router.delete('/admin/delete', authMiddleware, deleteTeam);

export default router;
