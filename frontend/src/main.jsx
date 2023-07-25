import React from "react"
import ReactDOM from "react-dom/client"
import Layout from "./design/Layout.jsx"
import Login from "./pages/Login.jsx"
import "./index.css"
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Categories from "./pages/Categories.jsx"
import CategoryInput from "./pages/CategoryInput.jsx"
import CategoryUpdate from "./pages/CategoryUpdate.jsx"
import Items from "./pages/Items.jsx"
import store from "./store.js"
import {Provider} from "react-redux"
import {ApiProvider} from "@reduxjs/toolkit/query/react"
import ItemLayout from "./design/ItemLayout.jsx"
import ItemInput from "./pages/ItemInput.jsx"
import ItemUpdate from "./pages/ItemUpdate.jsx"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Categories />} />
			<Route path="addCategory" element={<CategoryInput />} />
			<Route path="updateCategory/:id/:name" element={<CategoryUpdate />} />

			<Route path="items" element={<ItemLayout />}>
				<Route index element={<Items />} />
				<Route path="addItem" element={<ItemInput />} />
				<Route
					path="updateItem/:id/:name/:price/:quantity/:category/:description"
					element={<ItemUpdate />}
				/>
			</Route>
		</Route>
	)
)

function App() {
	return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>
)
