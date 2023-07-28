import React, {useState} from "react"
import Box from "@mui/material/Box"

import Divider from "@mui/material/Divider"
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
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {useLogoutMutation} from "../slices/usersApiSlice"
import {logout} from "../slices/authSlice"
import {toast} from "react-toastify"

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
	const {userInfo} = useSelector((state) => state.auth)

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const [logoutApiCall] = useLogoutMutation()

	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const navigation = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "Login",
			path: "/login",
		},
	]

	const adminNavigation = [
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

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap()
			dispatch(logout())
			toast.success("Successfuly Logged Out")
			navigate("/")
		} catch (error) {
			toast.error(error?.data?.message || error.error)
		}
	}

	const profileHandler = () => {
		navigate("/admin/profile")
	}

	const list = (anchor) => (
		<Box
			sx={{width: 250}}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<Divider />
			<List>
				{userInfo ? (
					<>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText
									primary={`${userInfo.firstName} ${userInfo.lastName}`}
									onClick={profileHandler}
								/>
							</ListItemButton>
						</ListItem>

						<Divider />
						<Divider />

						{adminNavigation.map((nav, index) => (
							<StyledLink key={index} to={nav.path}>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemText primary={nav.name} />
									</ListItemButton>
								</ListItem>
							</StyledLink>
						))}

						<Divider />
						<Divider />

						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary="Profile" onClick={profileHandler} />
							</ListItemButton>
						</ListItem>

						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary="Logout" onClick={logoutHandler} />
							</ListItemButton>
						</ListItem>
					</>
				) : (
					<>
						{navigation.map((nav, index) => (
							<StyledLink key={index} to={nav.path}>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemText primary={nav.name} />
									</ListItemButton>
								</ListItem>
							</StyledLink>
						))}
					</>
				)}
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
