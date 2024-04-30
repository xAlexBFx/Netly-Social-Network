import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';
import userRoutes from './routes/user.routes.js';
import RelationshipRoutes from './routes/relationship.routes.js';
const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/user', userRoutes);
app.use(RelationshipRoutes);

export default app;