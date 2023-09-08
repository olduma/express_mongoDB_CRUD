// у сервісі йде робота з БД і вхідними парпметрами, БЕЗ req/res

import PostService from './PostService.js';

class PostController {
    async create(req, res) {
        try {
            const post = await PostService.createPost(req.body, req.files.picture);
            res.json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getAll(req, res) {
        try {
            const posts = await PostService.getAllPosts();
            res.json(posts);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            const postId = req.params.id;
            const post = await PostService.getPostById(postId);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            const post = req.body;

            if (!post._id) {
                return res.status(400).json({ message: 'ID is missing' });
            }

            const updatedPost = await PostService.updatePost(post._id, post);
            res.json(updatedPost);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            const postId = req.params.id;

            if (!postId) {
                return res.status(400).json({ message: 'ID is missing' });
            }

            const deletedPost = await PostService.deletePost(postId);
            res.json(deletedPost);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new PostController();
