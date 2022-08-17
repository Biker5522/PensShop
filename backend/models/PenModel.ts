import mongoose from 'mongoose';

const PenSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 15
	},
	category: {
		type: String,
		required: true,
		enum: [ 'Fountain', 'Ballpoint', 'Gel-Pen' ]
	},
	price: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Pen', PenSchema);
