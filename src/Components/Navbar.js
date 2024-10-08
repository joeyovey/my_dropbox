import React from "react"
import { Navbar, Nav, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuthenticate } from "../Context"


export default function NavbarComponent() {
  const { logout } = useAuthenticate()
  
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <Navbar bg="primary" expand="sm" className="d-flex justify-content-between">
      <Navbar.Brand as={Link} to="/" className="text-white" fontSize="3rem">
        MyDropbox
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user" className="text-white ">
          Update Profile
        </Nav.Link>
        <Button onClick={handleLogout} className="p-2 text-white" >
          Logout
        </Button>
      </Nav>
    </Navbar>
  )
}
