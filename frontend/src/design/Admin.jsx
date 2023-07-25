import React from "react"
import {Outlet} from "react-router-dom"
import Sidebar from "./Sidebar"

export default function Admin() {
	return (
		<div>
			<Outlet />
		</div>
	)
}
