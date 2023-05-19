const mongoose = require("mongoose");

const Grievances = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ collection: 'grievances' }
);

const model = mongoose.model('GrievancesData', Grievances);

module.exports = model;