import React, { useState } from "react"
import { Card, Alert } from "react-bootstrap"
import { useAuthenticate } from "../Context"
import { Link } from "react-router-dom"
import Center from "./Center"

export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuthenticate()
  return (
    <Center>
      <Card className="bg-light">
        <Card.Body className="text-primary">
          <h2 className="text-center text-primary mb-4">My Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong className="text-dark">Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
    </Center>
  )
}
