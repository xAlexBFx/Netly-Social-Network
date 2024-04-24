import { Router } from 'express';
import { getCommentsFromPost, addComment, deleteComment, getLikes, addLike, deleteLike } from '../controllers/comment.controller.js';
import { authRequired } from '../middlewares/validate.token.js';
import { validateSchema } from '../middlewares/validate.schema.js';
import { createCommentSchema } from '../schemas/comment.schema.js';

const router = Router();

router.get('/get/:postId', authRequired, getCommentsFromPost);
router.post('/add/:postId', authRequired, validateSchema(createCommentSchema), addComment);
router.delete('/delete/:commentId', authRequired, deleteComment);
router.get('/like/:commentId', authRequired, getLikes);
router.post('/like/:commentId', authRequired, addLike);
router.delete('/like/:likeId', authRequired, deleteLike);


export default router;