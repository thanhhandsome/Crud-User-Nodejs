import express from 'express';
import View from './configs/View';
import initRoute from './route/web';
import Database from './configs/Database';
import initAPIRoute from './route/api';

require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

View(app);

initRoute(app);

initAPIRoute(app);

app.use((req, res) => {
    return res.render('404.ejs');
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})