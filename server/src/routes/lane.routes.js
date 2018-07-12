import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';
import { requiresLogin, requiresAdmin } from '../_util/route.middleware'

const router = new Router();


// Get all Posts
router.route('/lanes').get(LaneController.getLanes);

router.route('/lanes').post(LaneController.addLane);

router.route('/lanes/:id').put(LaneController.updateLane);

router.route('/lanes/:id').delete(LaneController.deleteLane);

router.route('/lanes/:id').get(LaneController.getLane);

export default router;
