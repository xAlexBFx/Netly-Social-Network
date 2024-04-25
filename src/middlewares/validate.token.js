import jwt from 'jsonwebtoken';
import Config from '../config.js';

export const authRequired = (req, res, next) => {
    const { accessToken } = req.cookies;
    if(!accessToken) return res.status(401).json({
        'message': 'You are not logged in!',
        'errorStatus' : true
    });

    jwt.verify(accessToken, Config.secretWebToken, (err, decoded_user) => {
        if(err) res.status(403).json({
            'message': 'Invalid access token!',
            'errorStatus' : true
        });
        req.user = decoded_user;
        next();
    })
};