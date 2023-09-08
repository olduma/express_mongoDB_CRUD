import Post from './Post.js';
import fileService from "./FileService.js";

class PostService {
    async createPost(post, picture) {
        try {
            const fileName = fileService.saveFile(picture)
            const createdPost = await Post.create({...post, picture: fileName});
            return createdPost;
        } catch (e) {
            throw e;
        }
    }

    async getAllPosts() {
        try {
            const posts = await Post.find();
            return posts;
        } catch (e) {
            throw e;
        }
    }

    async getPostById(id) {
        try {
            const post = await Post.findById(id);
            return post;
        } catch (e) {
            throw e;
        }
    }

    async updatePost(id, post) {
        try {
            const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
            return updatedPost;
        } catch (e) {
            throw e;
        }
    }

    async deletePost(id) {
        try {
            const deletedPost = await Post.findByIdAndDelete(id);
            return deletedPost;
        } catch (e) {
            throw e;
        }
    }
}

export default new PostService();
