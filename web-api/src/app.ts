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

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const app = createExpressServer({
  cors: {
    origin: ['http://localhost:5000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
  controllers: [RootController, AuthController, UserController, PostController]
});

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
  },
});
export const upload = multer({ storage });

// Initialize the Prisma client for database interactions
export const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});