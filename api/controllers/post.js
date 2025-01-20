import { db } from '../db.js'
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
    const category = req.query.category;
    const getPostsQuery = category ?
        `SELECT p.id, p.title, p.content, p.image_url, p.updated_at, p.user_id, p.category_id, c.name 
         FROM post p 
         JOIN category c ON p.category_id = c.id 
         WHERE UPPER(c.name) = UPPER($1)
         ORDER BY p.updated_at DESC`
        : "SELECT * FROM post ORDER BY updated_at DESC";

    const queryParams = category ? [category] : [];

    db.query(getPostsQuery, queryParams, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result.rows);
    });
}

export const getPostsBySearch = async (req, res) => {
    const search = req.query.search;
    const getPostsQuery =
        `SELECT * FROM post
         WHERE LOWER(title) LIKE LOWER('%' || $1 || '%')
         ORDER BY updated_at DESC`;

    db.query(getPostsQuery, [search], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).json(result.rows);
    });
}

export const getPost = async (req, res) => {
    const postId = req.params.id;
    const getPostQuery =
        `SELECT p.id, p.title, p.content, p.image_url, p.updated_at, p.user_id, u.username AS author, c.name AS category
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
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json('401. No token provided');
    }
    jwt.verify(token, "secretKey", (err, decoded) => {
        if (err) {
            return res.status(403).json('403. Token not valid');
        }
        const requestCategory = req.body.category;

        const getCategoryIdQuery = "SELECT id FROM category WHERE category.name = $1";

        db.query(getCategoryIdQuery, [requestCategory], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            const categoryId = parseInt(result.rows[0].id);

            const addPostQuery =
                `INSERT INTO
             post(title, content, image_url, created_at, updated_at, user_id, category_id)
             VALUES($1, $2, $3, $4, $5, $6, $7)`;

            const values = [
                req.body.title,
                req.body.content,
                req.body.image_url,
                req.body.created_at,
                req.body.created_at,
                parseInt(decoded.id),
                categoryId
            ];

            db.query(addPostQuery, values, (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(201).json("Post created successfully.");
            });
        });
    });
}

export const updatePost = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json('401. No token provided');
    }
    jwt.verify(token, "secretKey", (err, decoded) => {
        if (err) {
            return res.status(403).json('403. Token not valid');
        }
        const requestCategory = req.body.category;

        const getCategoryIdQuery = "SELECT id FROM category WHERE category.name = $1";

        db.query(getCategoryIdQuery, [requestCategory], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            const categoryId = parseInt(result.rows[0].id);

            const addPostQuery =
                `UPDATE post 
             SET title = $1, content = $2, image_url = $3, updated_at = $4, category_id = $5
             WHERE id = $6 AND user_id = $7`;

            const values = [
                req.body.title,
                req.body.content,
                req.body.image_url,
                req.body.updated_at,
                categoryId,
                req.params.id,
                parseInt(decoded.id)
            ];

            db.query(addPostQuery, values, (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(201).json("Post updated successfully.");
            });
        });
    });
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

