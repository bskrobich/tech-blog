import { db } from '../db.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {

    const queryCheckUser = 'SELECT * FROM "user" WHERE username = $1 OR email = $2';

    db.query(queryCheckUser, [req.body.username, req.body.email])
        .then(result => {
            if (result.rows.length) {
                return res.status(409).json("User already exists!");
            }

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const queryInsertUser = 'INSERT INTO "user"(username, password, email, role_id) VALUES ($1, $2, $3, $4)';
            const values = [req.body.username, hash, req.body.email, 1];

            db.query(queryInsertUser, values)
                .then(() => {
                    return res.status(201).json("Successfully registered.");
                })
                .catch(err => {
                    return res.json(err);
                });
        })
        .catch(err => {
            return res.json(err);
        })
}

export const login = (req, res) => {

    const queryCheckUser = 'SELECT * FROM "user" WHERE username = $1';

    db.query(queryCheckUser, [req.body.username])
    .then(result => {
        if (result.rows.length === 0) {
            return res.status(404).json("User doesn't exist!");
        }

        const passwordCheck = bcrypt.compareSync(req.body.password, result.rows[0].password);

        if (!passwordCheck) {
            return res.status(401).json("Username or password incorrect!");
        }

        const token = jwt.sign({id: result.rows[0].id}, "secretKey");
        const { password, ...data } = result.rows[0];

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'Lax',
            maxAge: 8 * 60 * 60 * 1000,
            path: '/',
            secure: false
        }).status(200).json(data);
    })
    .catch(err => {
        return res.json(err);
    })
}

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: 'Lax',
        path: '/',
        secure: false
    }).status(200).json("Successfully logged out!");
}