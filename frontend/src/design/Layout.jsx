import React from "react"
import {Outlet} from "react-router-dom"
import Sidebar from "./Sidebar"
import styled from "@emotion/styled"

import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const StyledMain = styled.main`
	margin: 0;
	padding: 0;
	background-color: #f5f5f5;
	font-family: "Inter", sans-serif;
`

const StyledLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export default function Layout() {
	return (
		<StyledMain>
			<Sidebar />

			<ToastContainer />
			<StyledLayout>
				<main>
					<Outlet />
				</main>
			</StyledLayout>
		</StyledMain>
	)
}
