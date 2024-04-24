import Comment from '../models/Comment.js';
import Like from '../models/like.js';

export const getCommentsFromPost = async(req, res) => {
    if(req.params.postId) {
        try {
            const comments = await Comment.find({post: req.params.postId}).populate('post');
            res.json(comments);
        } catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(400).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const addComment = async(req, res) => {
    if(req.body.message && req.params.postId) {
        try {
            const foundPost = Comment.findById(req.params.postId);
            if(!foundPost) return res.status(404).json({
                'message': 'Post not Found!',
                'errorStatus': true
            });

            const newComment = new Comment({
                message: req.body.message,
                user: req.user.id,
                post: req.params.postId
            })

            const savedComment = await newComment.save();
            if(!savedComment) return res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });

            res.json(savedComment);
        } catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(400).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const deleteComment = async(req, res) => {
    if(req.params.commentId) {
        try {
            const foundComment = await Comment.findById(req.params.commentId);
            if(!foundComment) return res.status(404).json({
                'message': 'Comment not found!',
                'errorStatus': true
            });

            if(req.user.id !== foundComment.user.toString()) return res.status(401).json({
                'message': 'Not Authorized!!!',
                'errorStatus': true
            });

            await Comment.findByIdAndDelete(req.params.commentId)
                .then(comment => {
                    if(!comment) return res.status(404).json({
                        'message': 'Error deleting comment',
                        'errorStatus': true
                    });
                    res.status(204).json();
                })
        } catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(400).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const getLikes = async(req, res) => {
    if(req.params.commentId) {
        try {
            const foundComment = await Comment.findById(req.params.commentId);
            if(!foundComment) return res.status(404).json({
                'message': 'Comment not Found!',
                'errorStatus': true
            });

            const commentLikes = await Like.find({to: req.params.commentId})
            res.json(commentLikes);
        } catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(400).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const addLike = async(req, res) => {
    if(req.params.commentId) {
        try {
            const foundComment = await Comment.findById(req.params.commentId);

            if(!foundComment) return res.status(404).json({
                'message': 'Comment not Found!',
                'errorStatus': true
            });

            const newLike = new Like({
                from: req.user.id,
                type: 'Comment',
                to: req.params.commentId
            });

            const savedLike = await newLike.save();
            if(!savedLike) return res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
            res.json(savedLike);
        } catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(400).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const deleteLike = async(req, res) => {
    if(req.params.likeId) {
        try {
            const foundLike = await Like.findById(req.params.likeId);
            if(!foundLike) return res.status(404).json({
                'message': 'Like not Found!',
                'errorStatus': true
            });

            if(req.user.id !== foundLike.from.toString()) return res.status(401).json({
                'message': 'Not Authorized!!!',
                'errorStatus': true
            });

            await Like.findByIdAndDelete(req.params.likeId)
                .then(like => {
                        if(!like) return res.status(404).json({
                            'message': 'Error deleting like!',
                            'errorStatus': true
                        });
                        res.status(201).json();
                    });

        } catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(400).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};