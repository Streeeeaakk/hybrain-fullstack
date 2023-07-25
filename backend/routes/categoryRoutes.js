import express from "express"
const router = express.Router()
import {
	addCategory,
	updateCategory,
	showCategory,
	deleteCategory,
} from "../controllers/categoryController.js"

router.get("/", showCategory)
router.post("/addCategory", addCategory)
router.put("/updateCategory", updateCategory)
router.delete("/deleteCategory", deleteCategory)

export default router
