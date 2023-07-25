import asyncHandler from "express-async-handler"
import Category from "../models/categoryModel.js"

// @desc show Category
// route POST /api/category/
// @access Public
const showCategory = asyncHandler(async (req, res) => {
	const getCategory = await Category.find().lean()
	res.status(200).json(getCategory)
})

// @desc add Category
// route POST /api/category/addCategory
// @access Public
const addCategory = asyncHandler(async (req, res) => {
	const {name} = req.body
	const categoryExists = await Category.findOne({name})

	if (categoryExists) {
		res.status(400)
		throw new Error("Category already exists")
	}

	const category = await Category.create({
		name,
	})

	if (category) {
		res.status(201).json({
			_id: category._id,
			name: category.name,
		})
	} else {
		res.status(400)
		throw new Error("Invalid category")
	}
})

// @desc update Category
// route PUT /api/category/updateCategory
// @access Public
const updateCategory = asyncHandler(async (req, res) => {
	const {id, name} = req.body
	if (!id || !name) {
		return res.status(400).json({message: "All fields are required"})
	}

	const category = await Category.findById(id).exec()

	if (!category) {
		return res.status(400).json({message: "Category not found"})
	}

	category.name = req.body.name || category.name

	const updatedCategory = await category.save()
	res.status(200).json({
		_id: updatedCategory._id,
		name: updatedCategory.name,
		message: "Category updated successfully",
	})
})

// @desc delete Category
// route DELETE /api/category/deleteCategory
// @access Private
const deleteCategory = asyncHandler(async (req, res) => {
	const {id} = req.body

	if (!id) {
		return res.status(400).json({message: "Category Id is required"})
	}

	const category = await Category.findById(id).exec()

	if (!category) {
		return res.status(400).json({message: "Category not found"})
	}

	const result = await category.deleteOne()
	res.status(200).json(`Category ${category.name} deleted`)
})

export {addCategory, updateCategory, showCategory, deleteCategory}
