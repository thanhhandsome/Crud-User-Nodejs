import express from "express";
import ApiController from '../controller/ApiController';

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', ApiController.getAllUsers);
    router.post('/create-user', ApiController.createNewUser);
    router.put('/update-user', ApiController.updateUser);
    router.delete('/delete-user/:id', ApiController.deleteUser);

    return app.use('/api/v1/', router)
}

export default initAPIRoute;
