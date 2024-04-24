import { Router } from 'express';
import { getPost, createPost, updatePost, deletePost, getUserPosts, getLikes, addLike, deleteLike } from '../controllers/post.controller.js';
import { authRequired } from '../middlewares/validate.token.js';
import { validateSchema } from '../middlewares/validate.schema.js'
import { createPostSchema, updatePostSchema } from '../schemas/post.schema.js';

const router = Router();

router.get('/', authRequired, getUserPosts);
router.get('/:id', authRequired, getPost);
router.post('/create', authRequired, validateSchema(createPostSchema), createPost);
router.put('/:id', authRequired, validateSchema(updatePostSchema), updatePost);
router.delete('/:id', authRequired, deletePost);
router.get('/like/:postId', authRequired, getLikes);
router.post('/like/:postId', authRequired, addLike);
router.delete('/like/:likeId', authRequired, deleteLike);

export default router