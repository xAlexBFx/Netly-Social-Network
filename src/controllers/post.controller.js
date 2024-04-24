import Post from '../models/Post.js';
import Like from '../models/like.js';

export const getUserPosts = async(req, res) => {
    try {
        const posts = await Post.find({user: req.user.id}).populate('user');
        res.json(posts)
    } catch (err) {
        console.log(err)
        res.status(404).json({
            'message': 'Internal Server Error',
            'errorStatus': true
        });
    };
};

export const getPost = async(req, res) => {
    if(req.params.id) {
        const postId = req.params.id;
        try {
            const foundPost = await Post.findOne({ _id : postId })
            if(!foundPost) return res.status(404).json({
                'message': 'Post not found!',
                'errorStatus': true
            });
            if(foundPost.sharestatus == false && req.user.id !== foundPost.user.toString()) return res.status(401).json({
                'message': 'Not Authorized!!!',
                'errorStatus': true
            });
            res.json(foundPost);
        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error!',
                'errorStatus': true
            });
        }
    } else {
        res.json({
            'message': 'Post id required!',
            'errorStatus': true
        });
    }
};

export const createPost = async(req, res) => {
    if(req.body.title && req.body.description) {
        const { title, description, shareStatus } = req.body;
        try {
            const newPost = new Post({
                title,
                description,
                user: req.user.id,
                sharestatus: shareStatus
            });

            const savedPost = await newPost.save();
            res.json({
                'message': 'New post created successfully!',
                'post': savedPost,
                'errorStatus': false
            });
        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error!',
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

export const updatePost = async(req, res) => {
    if(req.body && req.params.id){
        try {
            const foundPost = await Post.findById(req.params.id);
            if(!foundPost) return res.status(404).json({
                'message': 'Post not found!',
                'errorStatus': true
            });
            if(req.user.id !== foundPost.user.toString()) return res.status(401).json({
                'message': 'Not Authorized!!!',
                'errorStatus': true
            });

            const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if(!updatedPost) return res.status(404).json({
                'message': 'Post not found!',
                'errorStatus': true
            });
            res.json(updatedPost);
        }catch (err) {
            console.log(err)
            res.status(404).json({
                'message': 'Internal Server Error',
                'errorStatus': true
            });
        };
    } else {
        res.status(401).json({
            'message': 'You give data to replace!',
            'errorStatus': true
        });
    };
};

export const deletePost = async(req, res) => {
    try {
        const foundPost = await Post.findById(req.params.id);
        if(!foundPost) return res.status(404).json({
            'message': 'Post not found!',
            'errorStatus': true
        });
            if(req.user.id !== foundPost.user.toString()) return res.status(401).json({
                'message': 'Not Authorized!!!',
                'errorStatus': true
            });

        await Post.findByIdAndDelete(req.params.id)
            .then(post => {
                if(!post) return res.status(404).json({
                    'message': 'Error deleting post',
                    'errorStatus': true
                });
                res.status(204).json();
            })
    }catch (err) {
        console.log(err);
        res.status(404).json({
            'message': 'Internal Server Error',
            'errorStatus': true
        });
    };
}

export const getLikes = async(req, res) => {
    if(req.params.postId) {
        try {
            const foundPost = await Post.findById(req.params.postId);
            if(!foundPost) return res.status(404).json({
                'message': 'Post not Found!',
                'errorStatus': true
            });

            const postLikes = await Like.find({to: req.params.postId})
            res.json(postLikes);

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
    if(req.params.postId) {
        try {
            const foundPost = await Post.findById(req.params.postId);
            if(!foundPost) return res.status(404).json({
                'message': 'Post not Found!',
                'errorStatus': true
            });

            const newLike = new Like({
                from: req.user.id,
                type: 'Post',
                to: req.params.postId
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