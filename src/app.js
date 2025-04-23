import express from 'express';
// import https from 'https';
// import fs from 'fs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import userRoutes from './routes/user.routes.js';
import RelationshipRoutes from './routes/relationship.routes.js';
const app = express();

app.use(cors({
    origin:'exp://10.0.0.116:8081',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// app.use((req, res, next) => {
//     if (!req.secure) {
//         return res.redirect(`https://${req.headers.host}${req.url}`);
//     }
//     next();
// });
app.use('/api', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/user', userRoutes);
app.use(RelationshipRoutes);

// const privateKey = fs.readFileSync('server.key', 'utf8');
// const certificate = fs.readFileSync('server.cert', 'utf8');
// const credentials = { key: privateKey, cert: certificate };
// const httpsServer = https.createServer(credentials, app);


export default app;
