import express from 'express';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import path from 'path';
require('dotenv').config();

const app = express();
app.use(express.json());

//Routes
//Pens
const routerPens = require('../routes/pens');
app.use('/pens', routerPens);

//Users
const routerUsers = require('../routes/users');
app.use('/', routerUsers);

//Deployment
__dirname = path.resolve();

if (process.env.NODE_ENV === 'PRODUCTION') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
} else {
	app.use('/', (req, res) => {
		res.send('Pens World');
		console.log('0');
	});
}

//Database
mongoose.connect('mongodb+srv://dawid:cichy@rest.xarzi.mongodb.net/PenshopDb?retryWrites=true&w=majority', () =>
	console.log('Connected to Database')
);

app.listen(process.env.PORT || 5000, () => console.log('Server Running'));
