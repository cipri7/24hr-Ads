const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
    //check for same filename conflicts
      cb(null, file.originalname);
    }
  });
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const upload = multer({ storage });

const mongoUri = 'mongodb://localhost:27017';
let db;

MongoClient.connect(mongoUri)
    .then(client => {
        db = client.db('photoSite');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(error => console.error(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('photo'), async (req, res) => {
    const photo = {
        filename: req.file.filename,
        uploadTime: new Date()
    };
    await db.collection('photos').insertOne(photo);
    res.redirect('/');
});

app.get('/', async (req, res) => {
    const currentPhoto = await db.collection('photos').findOne({}, { sort: { uploadTime: -1 } });
    if (currentPhoto) {
        res.render('index', { imageUrl: `/uploads/${currentPhoto.filename}` });
    } else {
        res.render('index', { imageUrl: null });
    }
});
