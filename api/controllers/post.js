import { db } from '../db.js'

export const getPosts = async (req, res) => {
    const category = req.query.category;
    const getPostsQuery = category ?
        "SELECT * FROM post JOIN category ON post.category_id = category.id WHERE UPPER(category.name) = UPPER($1)"
        : "SELECT * FROM post";

    const queryParams = category ? [category] : [];

    db.query(getPostsQuery, queryParams, (err, result) => {
        if (err) {
            return res.send(err);
        }
        return res.status(200).json(result.rows);
    });
}
export const getPost = async (req, res) => {

}
export const addPost = async (req, res) => {

}
export const updatePost = async (req, res) => {

}
export const deletePost = async (req, res) => {

}

