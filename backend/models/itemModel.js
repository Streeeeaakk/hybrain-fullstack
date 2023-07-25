import mongoose from "mongoose"

const itemSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timeStamps: true,
	}
)

const Item = mongoose.model("Item", itemSchema)

export default Item
