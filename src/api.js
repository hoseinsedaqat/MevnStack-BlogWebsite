import axios from 'axios';

const url = 'http://localhost:5000/api/post';

export default class API {
    // get all post from api
    static async getAllPost() {
        const res = await axios.get(url);
        return res.data;
    }
    // get post By ID
    static async getPostByID(id) {
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
    // to insert a post to in  database
    static async addPost(post) {
        const res = await axios.post(url, post);
        return res.data;
    }
    // to update post to in database
    static async updatePost(id, post) {
        const res = await axios.put(`${url}/${id}`, post);
        return res.data;
    }
    // to delete a post to in database
    static async deltePost(id) {
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }
}