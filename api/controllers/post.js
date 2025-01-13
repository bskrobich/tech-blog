import { db } from '../db.js'

export const getPosts = async (req, res) => {
    const category = req.query.category;
    const getPostsQuery = category ?
        "SELECT * FROM post JOIN category ON post.category_id = category.id WHERE UPPER(category.name) = UPPER($1)"
        : "SELECT * FROM post";

    const queryParams = category ? [category] : [];

    db.query(getPostsQuery, queryParams, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result.rows);
    });
}

export const getPost = async (req, res) => {
    const postId = req.params.id;
    const getPostQuery =
        `SELECT p.title, p.content, p.image_url, p.updated_at, p.user_id, u.username AS author, c.name AS category
         FROM "user" u 
         JOIN post p ON p.user_id = u.id 
         JOIN category c ON p.category_id = c.id
         WHERE p.id = $1`;

    db.query(getPostQuery, [postId], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result.rows[0]);
    });
}

export const addPost = async (req, res) => {

}

export const updatePost = async (req, res) => {

}

export const deletePost = async (req, res) => {

}

