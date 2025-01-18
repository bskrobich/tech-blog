import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import multer from 'multer';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({ storage });
app.post('/api/upload', upload.single('image'), function (req, res) {
    const image = req.file;
    res.status(200).json(image.filename);
})

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});