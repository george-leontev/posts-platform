import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { createExpressServer } from 'routing-controllers';
import { PostController } from './controllers/post-controller';
import { RootController } from './controllers/root-controller';
import { UserController } from './controllers/user-controller';
import { AuthController } from './controllers/auth-controller';
import { UploadedFileController } from './controllers/uploaded-file-controller';

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = createExpressServer({
  cors: {
    origin: [process.env.WEB_UI],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  controllers: [RootController, AuthController, UserController, PostController, UploadedFileController]
});

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Initialize the Prisma client for database interactions
export const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});