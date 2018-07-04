import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';
const router = new Router();

// Get all Posts
router.route('/notes').get(NoteController.getNotes);

router.route('/notes').post(NoteController.addNote);

router.route('/notes/:id').put(NoteController.updateNote);

router.route('/notes/:id').delete(NoteController.deleteNote);

router.route('/notes/:id').get(NoteController.getNote);

export default router;
