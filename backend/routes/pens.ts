import { Response, Request } from 'express';
import express from 'express';
const router = express.Router();
const Pen = require('../models/PenModel');
//const upload = require('../middleware/upload');

//GET
router.get('/', async (req: Request, res: Response) => {
	try {
		const pens = await Pen.find();
		return res.status(200).json({ pens });
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//POST
router.post('/',async (req: Request, res: Response) => {
	const pen = new Pen({
		name: req.body.name,
		category: req.body.category,
		price: req.body.price,
		url:req.body.url
	});
	
	//save
	try {
		const savedPen = await pen.save();
		return res.status(200).json(savedPen);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//GET specific pen
router.get('/:id', async (req: Request, res: Response) => {
	try {
		const pen = await Pen.findById(req.params.id);
		return res.status(200).json(pen);
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//Delete
router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const removedPen = await Pen.deleteOne({ _id: req.params.id });
		return res.status(200).json('Deleted');
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

//PUT
router.put('/:id', async (req: Request, res: Response) => {
	try {
		const updatedPen = await Pen.findByIdAndUpdate(
			{ _id: req.params.id },
			{ name: req.body.name, category: req.body.category, price: req.body.price }
		);
		return res.status(200).json('Updated');
	} catch (err) {
		const result = (err as Error).message;
		return res.status(400).json({ result });
	}
});

module.exports = router;
