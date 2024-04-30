import { Router } from 'express';
import { getPost, createPost, updatePost, deletePost, getUserPosts } from '../controllers/post.controller.js';
import { authRequired } from '../middlewares/validate.token.js';
import { validateSchema } from '../middlewares/validate.schema.js'
import { createPostSchema, updatePostSchema } from '../schemas/post.schema.js';
import { dbIdPostParamsValidation } from '../middlewares/db.validation.js';
const router = Router();

router.get('/', authRequired, getUserPosts);
router.get('/:id', authRequired, dbIdPostParamsValidation, getPost);
router.post('/create', authRequired, validateSchema(createPostSchema), createPost);
router.put('/:id', authRequired, validateSchema(updatePostSchema), dbIdPostParamsValidation, updatePost);
router.delete('/:id', authRequired, dbIdPostParamsValidation, deletePost);

export default router