import {db} from "../db.js";
import jwt from "jsonwebtoken";

export const getComments = async (req, res) => {
    const postId = req.query.post;
    const getCommentsQuery =
        `SELECT u.id AS author_id, u.username AS author, c.id, c.content FROM comment c
         JOIN "user" u ON u.id = c.user_id
         WHERE post_id = $1
         ORDER BY c.created_at DESC`;

    db.query(getCommentsQuery, [postId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.status(200).send(result.rows);
    });
};

export const addComment = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json('401. No token provided');
    }
    jwt.verify(token, "secretKey", (err, decoded) => {
        if (err) {
            return res.status(403).json('403. Token not valid');
        }

        const addCommentQuery =
            `INSERT INTO comment (content, created_at, user_id, post_id) VALUES ($1, $2, $3, $4)`

        const values = [
            req.body.content,
            req.body.created_at,
            parseInt(decoded.id),
            parseInt(req.query.post)
        ];

        const getAuthorQuery = `SELECT username FROM "user" WHERE id = $1`
        const userId = decoded.id;

        db.query(getAuthorQuery, [userId], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            const username = result.rows[0].username;

            db.query(addCommentQuery, values, (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(201).json({
                    author: username,
                    author_id: decoded.id,
                    content: req.body.content
                });
            });
        });
    });
};

export const deleteComment = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json('401. No token provided');
    }
    jwt.verify(token, "secretKey", (err, decoded) => {
        if (err) {
            return res.status(403).json('403. Token not valid');
        }

        const commentId = req.params.id;

        const deleteCommentQuery = `DELETE FROM comment WHERE id = $1`;

        db.query(deleteCommentQuery, [commentId], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json("Comment deleted successfully.");
        })
    });
};