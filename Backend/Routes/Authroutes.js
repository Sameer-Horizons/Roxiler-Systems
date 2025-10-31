import express from 'express';
import { AddingAdmin, AddingUser, Addstore, login, Logout, Nuserlogin, rating, register } from '../Controllers/AuthController.js';


const Router = express.Router();

Router.post('/register', register);
Router.post('/login', login);
Router.post('/Nuserlogin', Nuserlogin);
Router.post('/logout', Logout);
Router.post('/Addingstore', Addstore);
Router.post('/AddingUser', AddingUser);
Router.post('/AddingAdmin', AddingAdmin);
Router.post('/rating',rating);
Router.put('/rating',rating);


export default Router;