const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'please add a name'],
	},
	email: {
		type: String,
		required: [true, 'please add an email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'please add a password'],
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
},
{
	timestamps: true,
}
)

module.exports = mongoose.model('User', userSchema)