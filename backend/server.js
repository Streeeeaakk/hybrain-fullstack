import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"
const port = process.env.PORT || 5000
import categoryRoutes from "./routes/categoryRoutes.js"
import itemRoutes from "./routes/itemRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import path from "path"
connectDB()

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

app.get("/", (req, res) => res.send("Server is Ready"))

app.use("/api/users", userRoutes)

app.use("/api/category", categoryRoutes)

app.use("/api/items", itemRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started at port ${port}`))
