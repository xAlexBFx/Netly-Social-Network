import User from "../models/User.js";
import Relationship from "../models/Relationship.js";
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
export const followUser = async (req, res) =>{
    if(req.params.userName) {
        try {
            const foundUser = await User.findOne({username: req.params.userName});
            if(!foundUser) return res.json({
                'message': 'User not found!',
                'errorStatus': true
            });

            const foundFollow = await Relationship.findOne({fromUser: req.user.id, to: foundUser._id});
            if(foundFollow) return res.status(401).json({
                'message': 'Following User Already!',
                'errorStatus': true
            });

            if(foundUser._id.toString() === req.user.id.toString()) return res.status(401).json({
                'message': 'You can not follow yourself!',
                'errorStatus': true
            });

            const newRelationship = new Relationship({
                fromUser: req.user.id,
                as: 'Follower',
                toType: 'User',
                to: foundUser._id
            });
            const savedRelationship = newRelationship.save();
            if(!savedRelationship) return res.json({
                'message': 'Internal Server error',
                'errorStatus': true
            });

            res.status(204).json();
        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error',
                'errorStatus': true
            });
        }
    } else {
        res.json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const unFollowUser = async (req, res) =>{
    if(req.params.userName) {
        try {
            const foundUser = await User.findOne({username: req.params.userName});
            if(!foundUser) return res.json({
                'message': 'User not found!',
                'errorStatus': true
            });

            const foundFollow = await Relationship.findOne({fromUser: req.user.id, to: foundUser._id});
            if(!foundFollow) return res.status(401).json({
                'message': 'You Are Not Following This User Yet!',
                'errorStatus': true
            });

            await Relationship.deleteOne({fromUser: req.user.id, to: foundUser._id})
                .then(deletedFollow => {
                    if(deletedFollow.deletedCount == 0 || deletedFollow.acknowledged == false) return res.status(404).json({
                        'message': 'Error unfollowing user',
                        'errorStatus': true
                    });
                    res.status(204).json();
                })
        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error',
                'errorStatus': true
            });
        }
    } else {
        res.json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const addLikeToComment = async(req, res) => {
    if(req.params.commentId) {
        try {
            const foundLike = await Relationship.findOne({fromUser: req.user.id, to: req.params.commentId});
            if(foundLike) return res.status(401).json({
                'message': 'Comment already liked!',
                'errorStatus': true
            });

            const foundComment = await Comment.findById(req.params.commentId);
            if(!foundComment) return res.status(404).json({
                'message': 'Comment not Found!',
                'errorStatus': true
            });

            if(foundComment.user.toString() === req.user.id.toString()) return res.status(401).json({
                'message': 'You can not like your own comment!',
                'errorStatus': true
            });

            const newRelationship = new Relationship({
                fromUser: req.user.id,
                as: 'Like',
                toType: 'Comment',
                to: foundComment._id
            });
            const savedRelationship = newRelationship.save();
            if(!savedRelationship) return res.json({
                'message': 'Internal Server error',
                'errorStatus': true
            });

            res.status(204).json();
        } catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(401).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const getLikesFromComment = async(req, res) => {
    if(req.params.commentId) {
        try {
            const foundComment = await Comment.findById(req.params.commentId);
            if(!foundComment) return res.status(404).json({
                'message': 'Comment not Found!',
                'errorStatus': true
            });

            const commentLikes = await Relationship.find({to: req.params.commentId}).populate('to');
            res.json(commentLikes.length);
        } catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(401).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const deleteLikeFromComment = async(req, res) => {
    if(req.params.commentId) {
        try {
            const foundLike = await Relationship.findOne({fromUser: req.user.id, to: req.params.commentId})
            if(!foundLike) return res.status(404).json({
                'message': 'Like not Found!',
                'errorStatus': true
            });

            if(req.user.id !== foundLike.fromUser.toString()) return res.status(401).json({
                'message': 'Not Authorized!!!',
                'errorStatus': true
            });

            await Relationship.deleteOne({fromUser: req.user.id, to: req.params.commentId})
                .then(data => {
                        if(data.deletedCount == 0 || data.acknowledged == false) return res.status(404).json({
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
        res.status(401).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const getLikesFromPost = async(req, res) => {
    if(req.params.postId) {
        try {
            const foundPost = await Post.findById(req.params.postId);
            if(!foundPost) return res.status(404).json({
                'message': 'Post not Found!',
                'errorStatus': true
            });

            const postLikes = await Relationship.find({to: req.params.postId}).populate('to');
            res.json(postLikes.length);
        } catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(401).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const addLikeToPost = async(req, res) => {
    if(req.params.postId) {
        try {
            const foundLike = await Relationship.findOne({fromUser: req.user.id, as: 'Like', toType: 'Post', to: req.params.postId});
            if(foundLike) return res.status(401).json({
                'message': 'Post already liked!',
                'errorStatus': true
            });

            const foundPost = await Post.findById(req.params.postId);
            if(!foundPost) return res.status(404).json({
                'message': 'Post not Found!',
                'errorStatus': true
            });

            const newLike = new Relationship({
                fromUser: req.user.id,
                as: 'Like',
                toType: 'Post',
                to: foundPost._id
            });

            const savedLike = await newLike.save();
            if(!savedLike) return res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
            res.status(204).json();
        } catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(401).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const deleteLikeFromPost = async(req, res) => {
    if(req.params.postId) {
        try {
            const foundLike = await Relationship.findOne({fromUser: req.user.id, to: req.params.postId});
            if(!foundLike) return res.status(404).json({
                'message': 'Like not Found!',
                'errorStatus': true
            });

            if(req.user.id !== foundLike.fromUser.toString()) return res.status(401).json({
                'message': 'Not Authorized!!!',
                'errorStatus': true
            });

            await Relationship.deleteOne({fromUser: req.user.id, to: req.params.postId})
                .then(data => {
                        if(data.deletedCount == 0 ||data.acknowledged == false) return res.status(404).json({
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
        res.status(401).json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};