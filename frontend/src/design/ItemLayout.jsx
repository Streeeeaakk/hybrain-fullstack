import React from "react"
import {Outlet} from "react-router-dom"

export default function ItemLayout() {
	return (
		<div>
			<Outlet />
		</div>
	)
}
