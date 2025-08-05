import express from 'express';
import authRoutes from './http/routes/authRoutes.js';
import userRoutes from './http/routes/userRoutes.js';
import postRoutes from './http/routes/postRoutes.js';
import swaggerRoutes from './http/routes/swaggerRoutes.cjs';
import { notFound } from './http/middlewares/notFoundMiddleware.js';
import { errorHandler } from './http/middlewares/errors';
export const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('json spaces', 2);

app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.use('/posts', postRoutes);

app.use('/doc', swaggerRoutes);

app.use(notFound);

app.use(errorHandler);
