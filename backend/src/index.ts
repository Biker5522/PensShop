import express from 'express';
import mongoose from 'mongoose';
import { Request, Response } from 'express';

const app = express();
app.use(express.json());

//Routes
//Pens
const routerPens = require('../routes/pens');
app.use('/pens', routerPens);

app.get('/', function(req: Request, res: Response) {
	res.send('Pen World');
});

//Database
mongoose.connect('mongodb+srv://dawid:cichy@rest.xarzi.mongodb.net/PenshopDb?retryWrites=true&w=majority', () =>
	console.log('Connected to Database')
);

app.listen(process.env.PORT || 5000, () => console.log('Server Running'));
