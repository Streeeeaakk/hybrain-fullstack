import React, {useState} from "react"
import Box from "@mui/material/Box"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import {Link, Route, Routes, MemoryRouter, useLocation} from "react-router-dom"
import {StaticRouter} from "react-router-dom/server"
import MenuIcon from "@mui/icons-material/Menu"
import {styled} from "@mui/material"

const StyledLink = styled(Link)`
	padding: 6px 8px 6px 16px;
	text-decoration: none;
	list-style: none;
	font-size: 25px;
	margin-top: 10px;
	color: black;
	display: flex;
	align-items: center;
	cursor: pointer;
	&:hover {
		background-color: #444444;
	}
`

export default function Sidebar() {
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const navigation = [
		{
			name: "Login",
			path: "/login",
		},
		{
			name: "Categories",
			path: "/admin/",
		},
		{
			name: "Items",
			path: "/admin/items",
		},
	]

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event &&
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return
		}

		setState({...state, [anchor]: open})
	}

	const list = (anchor) => (
		<Box
			sx={{width: 250}}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{navigation.map((nav, index) => (
					<StyledLink key={index} to={nav.path}>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary={nav.name} />
							</ListItemButton>
						</ListItem>
					</StyledLink>
				))}
			</List>
		</Box>
	)

	return (
		<div>
			{["left"].map((anchor) => (
				<React.Fragment key={anchor}>
					<Button onClick={toggleDrawer(anchor, true)}>
						<MenuIcon sx={{color: "black"}} />
					</Button>
					<SwipeableDrawer
						anchor={anchor}
						open={state[anchor]}
						onClose={toggleDrawer(anchor, false)}
						onOpen={toggleDrawer(anchor, true)}
					>
						{list(anchor)}
					</SwipeableDrawer>
				</React.Fragment>
			))}
		</div>
	)
}
