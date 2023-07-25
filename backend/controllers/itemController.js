import asyncHandler from "express-async-handler"
import Item from "../models/itemModel.js"

// @desc show Item
// route POST /api/item/
// @access Public
const showItem = asyncHandler(async (req, res) => {
	const items = await Item.find({}).exec()
	res.status(200).json(items)
})

// @desc add Item
// route POST /api/item/addItem
// @access Public
const addItem = asyncHandler(async (req, res) => {
	const {name, price, quantity, category, description} = req.body

	const itemExists = await Item.findOne({name})
	if (itemExists) {
		res.status(400)
		throw new Error("Item already exists")
	}

	const item = await Item.create({
		name,
		price,
		quantity,
		category,
		description,
	})

	if (item) {
		res.status(201).json({
			_id: item._id,
			name: item.name,
			price: item.price,
			quantity: item.quantity,
			category: item.category,
			description: item.description,
		})
	} else {
		res.status(400)
		throw new Error("Invalid item")
	}
})

// @desc update Item
// route PUT /api/item/updateItem
// @access Public
const updateItem = asyncHandler(async (req, res) => {
	const {id, name, price, quantity, category, description} = req.body

	if (!id || !name || !price || !quantity || !category || !description) {
		return res.status(400).json({message: "All fields are required"})
	}

	const item = await Item.findById(id).exec()

	if (!item) {
		return res.status(400).json({message: "Item not found"})
	}

	item.name = name || item.name
	item.price = price || item.price
	item.quantity = quantity || item.quantity
	item.category = category || item.category
	item.description = description || item.description

	const updatedItem = await item.save()

	res.status(200).json({
		_id: updatedItem._id,
		name: updatedItem.name,
		price: updatedItem.price,
		quantity: updatedItem.quantity,
		category: updatedItem.category,
		description: updatedItem.description,
		message: "Item updated successfully",
	})
})

// @desc delete Item
// route DELETE /api/item/deleteItem
// @access Public
const deleteItem = asyncHandler(async (req, res) => {
	const {id} = req.body

	if (!id) {
		return res.status(400).json({message: "ID is required"})
	}

	const item = await Item.findById(id).exec()

	if (!item) {
		return res.status(400).json({message: "Item not found"})
	}

	const result = await item.deleteOne()

	res.status(200).json(`Item ${item.name} deleted successfully`)
})

export {showItem, addItem, updateItem, deleteItem}
