
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'db.json');

// Setup Uploads Directory
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Setup DB
const defaultData = {
    works: [
        {
            id: '1',
            title: "Sarah & Mike's Vows",
            category: "Wedding",
            description: "An intimate celebration of love in the heart of Tuscany. Pure, unscripted emotion captured in golden light.",
            coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
            images: [
                "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070",
                "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=1978",
                "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=2070",
                "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070"
            ],
            template: 'wedding',
            type: 'photo'
        },
        {
            id: '2',
            title: "Speed Demon GT",
            category: "Motorgraphy",
            description: "Raw power meets asphalt. A high-octane shoot tracking the latest GT release on the test track.",
            coverImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966",
            images: [
                "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966",
                "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070",
                "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070",
                "https://images.unsplash.com/photo-1494905998402-395d579af905?q=80&w=2070"
            ],
            template: 'motor',
            type: 'photo'
        }
    ],
    admin: {
        username: 'admin',
        password: 'password123'
    }
};

const getDb = () => {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2));
        return defaultData;
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
};

const saveDb = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadDir));

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// SECRET
const JWT_SECRET = 'super-secret-key-change-this';

// Auth Middleware
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// --- ROUTES ---

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const db = getDb();
    if (username === db.admin.username && password === db.admin.password) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Get Works
app.get('/api/works', (req, res) => {
    const db = getDb();
    res.json(db.works);
});

// Get Single Work
app.get('/api/works/:id', (req, res) => {
    const db = getDb();
    const work = db.works.find(w => w.id === req.params.id);
    if (work) res.json(work);
    else res.status(404).json({ message: 'Not found' });
});

// Create Work
app.post('/api/works', authenticate, (req, res) => {
    const db = getDb();
    const newWork = { id: Date.now().toString(), ...req.body };
    db.works.push(newWork);
    saveDb(db);
    res.json(newWork);
});

// Update Work
app.put('/api/works/:id', authenticate, (req, res) => {
    const db = getDb();
    const index = db.works.findIndex(w => w.id === req.params.id);
    if (index > -1) {
        db.works[index] = { ...db.works[index], ...req.body };
        saveDb(db);
        res.json(db.works[index]);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

// Delete Work
app.delete('/api/works/:id', authenticate, (req, res) => {
    const db = getDb();
    db.works = db.works.filter(w => w.id !== req.params.id);
    saveDb(db);
    res.json({ message: 'Deleted' });
});

// Upload File
app.post('/api/upload', authenticate, upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
