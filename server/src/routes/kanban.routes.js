import { Router } from 'express';
import * as KanbanController from '../controllers/kanban.controller';
const router = new Router();

// Get all Posts
router.route('/kanbans').get(KanbanController.getKanbans);

router.route('/kanbans').post(KanbanController.addKanban);

router.route('/kanbans/:id').put(KanbanController.updateKanban);

router.route('/kanbans/:id').delete(KanbanController.deleteKanban);

router.route('/kanbans/:id').get(KanbanController.getKanban);

export default router;
