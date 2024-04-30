import { Router } from 'express';
import { followUser, unFollowUser, getLikesFromComment, addLikeToComment, deleteLikeFromComment, getLikesFromPost, addLikeToPost, deleteLikeFromPost } from '../controllers/relationship.controller.js';
import { authRequired } from '../middlewares/validate.token.js';
import { dbIdRelationshipsParamsValidation } from '../middlewares/db.validation.js';
const router = Router();

router.post('/follow/:userName', authRequired, followUser);
router.delete('/follow/:userName', authRequired, unFollowUser);

router.get('/comment-likes/:commentId', authRequired, dbIdRelationshipsParamsValidation, getLikesFromComment);
router.post('/comment-likes/:commentId', authRequired, dbIdRelationshipsParamsValidation, addLikeToComment);
router.delete('/comment-likes/:commentId', authRequired, dbIdRelationshipsParamsValidation, deleteLikeFromComment);

router.get('/post-likes/:postId', authRequired, dbIdRelationshipsParamsValidation, getLikesFromPost);
router.post('/post-likes/:postId', authRequired, dbIdRelationshipsParamsValidation, addLikeToPost);
router.delete('/post-likes/:postId', authRequired, dbIdRelationshipsParamsValidation, deleteLikeFromPost);

export default router