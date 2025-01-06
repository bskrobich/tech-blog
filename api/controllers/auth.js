import { db } from '../db.js'
import bcrypt from 'bcryptjs';

export const register = (req, res) => {

    const query = "SELECT * FROM user WHERE username = ? OR email = ?";

    db.query(query, [req.body.username, req.body.email], (err, result) => {
        if (err) {
            return res.json(err);
        }
        if (result.length) {
            return res.status(409).json("409. User already exists.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const query = "INSERT INTO user('username', 'password', 'email', 'role_id') VALUES (?)";
        const values = [req.body.username, hash, req.body.email, 1];

        db.query(query, values, (err, result) => {
            if (err) {
                return res.json(err);
            }
            return res.status(201).json("Successfully registered.");
        })
    });
}

export const login = (req, res) => {
}

export const logout = (req, res) => {
}