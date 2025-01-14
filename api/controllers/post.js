import { db } from '../db.js'
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
    const category = req.query.category;
    const getPostsQuery = category ?
        `SELECT p.id, p.title, p.content, p.image_url, p.updated_at, p.user_id, p.category_id, c.name 
         FROM post p 
         JOIN category c ON p.category_id = c.id 
         WHERE UPPER(c.name) = UPPER($1)`
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
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json('401. No token provided');
    }
    jwt.verify(token, "secretKey", (err, decoded) => {
        if (err) {
            return res.status(403).json('403. Token not valid');
        }

        const postId = req.params.id;
        const deletePostQuery =
            `DELETE FROM post p
             USING "user" u
             WHERE p.id = $1 AND (p.user_id = $2 OR u.role_id = 1)`;

        db.query(deletePostQuery, [postId, decoded.id], (err) => {
            if (err) {
                return res.status(403).json("403. Only your posts can be deleted");
            }
            return res.status(200).json("Post deleted successfully.");
        });
    });
}

