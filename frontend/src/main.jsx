import React from "react"
import ReactDOM from "react-dom/client"
import Layout from "./design/Layout.jsx"

import LoginForm from "./pages/LoginForm.jsx"
import RegisterForm from "./pages/RegisterForm.jsx"
import ProfileScreen from "./pages/ProfileScreen.jsx"

import "./index.css"
import {
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Admin from "./design/Admin"
import Categories from "./pages/Categories/Categories.jsx"
import CategoryInput from "./pages/Categories/CategoryInput.jsx"
import CategoryUpdate from "./pages/Categories/CategoryUpdate.jsx"

import Items from "./pages/Items/Items.jsx"
import ItemInput from "./pages/Items/ItemInput.jsx"
import ItemUpdate from "./pages/Items/ItemUpdate.jsx"
import ItemLayout from "./design/ItemLayout.jsx"

import PrivateRoute from "./components/PrivateRoute.jsx"

import store from "./store.js"
import {Provider} from "react-redux"
import Dashboard from "./pages/Dashboard.jsx"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Dashboard />} />
			<Route path="login" element={<LoginForm />} />
			<Route path="register" element={<RegisterForm />} />

			<Route path="" element={<PrivateRoute />}>
				<Route path="admin" element={<Admin />}>
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

					<Route path="profile" element={<ProfileScreen />} />
				</Route>
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
