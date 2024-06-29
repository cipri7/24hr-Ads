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

const PORT = process.env.PORT || 3000;

MongoClient.connect(mongoUri)
    .then(client => {
        db = client.db('photoSite');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => console.error(error));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.post('/upload', upload.single('photo'), async (req, res) => {
    const photo = {
        filename: req.file.filename,
        uploadTime: new Date(),
        link: req.body.link
    };
    await db.collection('photos').insertOne(photo);
    res.redirect('/');
});

app.get('/', async (req, res) => {
    const currentPhoto = await db.collection('photos').findOne({}, { sort: { uploadTime: -1 } });
    if (currentPhoto) {
        res.render('index', { imageUrl: `/uploads/${currentPhoto.filename}`, link: currentPhoto.link });
    } else {
        res.render('index', { imageUrl: null, link: null });
    }
});
