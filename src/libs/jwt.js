import jwt from 'jsonwebtoken';
import Config from '../config.js';

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            Config.secretWebToken,
            {
                expiresIn: '1d'
            },
            (err, token) => {
                if(err) reject(err);
                resolve(token);
            }
        )
    })
};