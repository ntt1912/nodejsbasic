import express from "express";
import homeController from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {

    router.get('/', homeController.getHometab);
    router.get('/detail/account/:id', homeController.getDetailTab);
    router.post('/create-new-account', homeController.createNewAccount);
    router.post('/delete-account', homeController.deleteAccount);
    router.get('/edit-account/:id', homeController.getEditTab);
    router.post('/update-account', homeController.postUpdateAccount);

    return app.use('/', router)

}

export default initWebRoute;