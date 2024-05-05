import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Relationship from '../models/Relationship.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import Config from '../config.js';

export const register = async (req, res) => {
    if(req.body.username && req.body.password && req.body.email, req.body.nationality && req.body.gender && req.body.birthDate) {
        const { username, password, email, birthDate, description, nationality, gender } = req.body;
        try {
            const foundUserByUsername = await User.findOne({username});
            if(foundUserByUsername) return res.status(401).json({
                'message': 'This username is already in use!',
                'errorStatus': true
            });

            const foundUserByEmail = await User.findOne({email});
            if(foundUserByEmail) return res.status(401).json({
                'message': 'This email is already in use!',
                'errorStatus': true
            });

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                password: passwordHash,
                email,
                description,
                birthdate: birthDate,
                nationality,
                gender
            });
            const savedUser = await newUser.save();
            const accessToken = await createAccessToken({ id: savedUser._id });
            res.cookie('accessToken', accessToken)
            res.json({
                'message': 'New user created successfully!',
                'user': {
                    'username': savedUser.username,
                    'email': savedUser.email,
                    'description': savedUser.description,
                    'id': savedUser._id,
                    'birthDate': savedUser.birthdate,
                    'gender': savedUser.gender,
                    'settings': savedUser.settings,
                    'nationality': savedUser.nationality,
                    'createdAt': savedUser.createdAt,
                    'updatedAt': savedUser.updatedAt
                },
                'errorStatus': false
            });
        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error',
                'errorStatus': true
            });
        }
    } else {
        res.json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const login = async (req, res) => {
    if(req.body.toFindUserData && req.body.password) {
        const { password, toFindUserData } = req.body;
        try {
            const foundUserByEmail = await User.findOne({ email: toFindUserData });
            const foundUserByUsername = await User.findOne({ username: toFindUserData });
            if(!foundUserByEmail && !foundUserByUsername) return res.status(401).json({
                'message' : 'User not found!',
                'errorStatus' : true
            });

            const foundUser = foundUserByEmail ? foundUserByEmail: foundUserByUsername;
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if(!isMatch) return res.status(401).json({
                'message' : 'Incorrect Password!',
                'errorStatus' : true
            });

            const accessToken = await createAccessToken({ id: foundUser._id });
            res.cookie('accessToken', accessToken)
            res.json({
                'message': 'Logged In',
                'user': {
                    'username': foundUser.username,
                    'email': foundUser.email,
                    'description': foundUser.description,
                    'id': foundUser._id,
                    'birthDate': foundUser.birthdate,
                    'gender': foundUser.gender,
                    'settings': foundUser.settings,
                    'nationality': foundUser.nationality,
                    'createdAt': foundUser.createdAt,
                    'updatedAt': foundUser.updatedAt
                },
                'errorStatus': false
            });
        } catch (err) {
            console.log(err);
            res.json({
                'message': 'Internal server error',
                'errorStatus': true
            });
        }
    } else {
        res.json({
            'message': 'There are missing values!',
            'errorStatus': true
        });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie('accessToken', '',{
            expires: new Date(0)
        });
        res.json({
            'message' : 'Logged out',
            'errorStatus' : false
        });
    } catch (err) {
        console.log(err);
        res.json({
            'message': 'Internal server error',
            'errorStatus': true
        });
    }
};

export const deleteAuth = async (req, res) => {
    try {
        res.cookie('accessToken', '',{
            expires: new Date(0)
        });
        
            await Relationship.deleteMany({fromUser: req.user.id})
            await Relationship.deleteMany({to: req.user.id})
            await Comment.deleteMany({user: req.user.id})
            await Post.deleteMany({user: req.user.id})
            await User.findByIdAndDelete(req.user.id)
                .then(user => {
                    if(!user) return res.status(404).json({
                        message: 'Internal server error',
                        errorStatus : true
                    })
                });
        res.status(202).json();
    } catch (err) {
        console.log(err);
        res.json({
            'message': 'Internal server error',
            'errorStatus': true
        });
    }
};

export const verifyAccessToken = async (req, res) => {
    const { accessToken } = req.cookies;
    if(!accessToken) return res.status(401).json({
        'message' : 'Unauthorized',
        'errorStatus' : true
    });
    jwt.verify(accessToken, Config.secretWebToken, async (err, decoded_user) => {
        if(err) return res.status(401).json({
            'message' : 'Unauthorized',
            'errorStatus' : true
        });
        const foundUser = await User.findById(decoded_user.id);
        if(!foundUser) return res.status(401).json({
            'message' : 'Unauthorized',
            'errorStatus' : true
        });
        res.json({
            'username': foundUser.username,
            'email': foundUser.email,
            'description': foundUser.description,
            'id': foundUser.id,
            'birthDate': foundUser.birthdate,
            'gender': foundUser.gender,
            'settings': foundUser.settings,
            'nationality': foundUser.nationality,
            'createdAt': foundUser.createdAt,
            'updatedAt': foundUser.updatedAt
        });
    })
}