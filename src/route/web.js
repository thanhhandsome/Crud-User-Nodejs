import express from "express";
import homeCotroller from '../controller/homeController';
import multer from 'multer';
import path from 'path';
var appRoot = require('app-root-path');

let router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

let uploadF = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 4);

const initRoute = (app) => {
    router.get('/', homeCotroller.getHome);
    router.get('/detail/user/:id', homeCotroller.getDetailHome);

    router.get('/create-user', homeCotroller.getCreateHome);
    router.post('/create-new', homeCotroller.createNewUser);

    router.post('/delete-user', homeCotroller.deleteUser);

    router.get('/edit-user/:id', homeCotroller.getEditHome);
    router.post('/update-user', homeCotroller.updateUser);
    router.get('/upload', homeCotroller.getUpload);
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeCotroller.uploadFile);
    router.post('/upload-multiple-images', (req, res, next) => {
        uploadF(req, res, (err) => {
            if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
                res.send('LIMIT_UNEXPECTED_FILE')
            } else if (err) {
                res.send(err)
            }
            else {
                next();
            }
        })

    }, homeCotroller.uploadMultipleFile);

    // router.get('/home', (req, res) => {
    //     res.send('Thanh Handsome!')
    // })



    return app.use('/', router)
}

export default initRoute;
