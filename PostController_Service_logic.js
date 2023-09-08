// у контроллері йде робота з клієнт - серверною частиною (params, body, headers ...)
// у сервісі йде робота з БД і вхідними параметрами, БЕЗ req/res
// so we create only PostController with FULL logic
// and then need to separate PostController and PostService

import Post from "./Post.js";

class PostController {
    async create(req, res) {
        try {
            const {author, title, content, picture} = req.body
            const post = await Post.create({author, title, content, picture})
            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await Post.find();
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const postId = req.params.id;

            if (!postId) {
                return res.status(400).json({message: "ID is missing"});
            }

            // Assuming postId is a valid ObjectId in MongoDB
            const post = await Post.findById(postId);

            if (!post) {
                return res.status(404).json({message: "Post not found"});
            }

            return res.json(post);
        } catch (e) {
            console.error(e);
            res.status(500).json({message: "Server error"});
        }
    }

    async update(req, res) {
        try {
            const post = req.body
            if (!post._id) {
                return res.status(400).json({message: "ID is missing"});
            }
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {
            const postId = req.params.id
            if (!postId) {
                return res.status(400).json({message: "ID is missing"});
            }
            const deletedPost = await Post.findByIdAndDelete(postId)
            res.json(deletedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new PostController();
