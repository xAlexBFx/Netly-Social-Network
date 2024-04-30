import { Router } from 'express';
import { getCommentsFromPost, addComment, deleteComment} from '../controllers/comment.controller.js';
import { authRequired } from '../middlewares/validate.token.js';
import { validateSchema } from '../middlewares/validate.schema.js';
import { createCommentSchema } from '../schemas/comment.schema.js';
import { dbIdCommentsParamsValidation } from '../middlewares/db.validation.js'
const router = Router();

router.get('/get/:postId', authRequired, dbIdCommentsParamsValidation, getCommentsFromPost);
router.post('/add/:postId', authRequired, validateSchema(createCommentSchema), dbIdCommentsParamsValidation, addComment);
router.delete('/delete/:commentId', authRequired, dbIdCommentsParamsValidation, deleteComment);



export default router;