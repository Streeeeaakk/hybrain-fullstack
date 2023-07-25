import express from "express"

const router = express.Router()

import {addItem, updateItem, showItem, deleteItem} from "../controllers/itemController.js"

router.get("/", showItem)

router.post("/addItem", addItem)

router.put("/updateItem", updateItem)

router.delete("/deleteItem", deleteItem)

export default router
