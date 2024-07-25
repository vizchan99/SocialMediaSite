const Post = require('../models/Post');
exports.createPost = async(req, res) => {
    try {
        const newPost = new Post({
            text: req.body.text,
            user: req.user.id,
        });
        const post = await newPost.save()
        res.json(post);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); 
        if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
            return res.status(400).json({ msg: 'Post has not yet been liked'});
        }
        post.likes = post.likes.filter(
            ({ user }) => user.toString() !== req.user.id
        );
        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.commentPost = async(req, res) => {
    try{
        const post = await Post.findById(req.paparms.id);
        const newComment = {
            text: req.body.text,
            user: req.user.id,
        };
        posts.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};