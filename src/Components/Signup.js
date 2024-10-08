import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuthenticate } from "../Context"
import { Link, useHistory } from "react-router-dom"
import Center from "./Center"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuthenticate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function signUp(e) { e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }

  return (
    <Center>
      <Card>
        <Card.Body className="bg-light">
          <h2 className="text-center text-primary mb-4 ">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={signUp}>
            <Form.Group id="email">
              <Form.Control className="bg-light text-dark border border-primary rounded" placeholder="Email" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control className="bg-light text-dark border border-primary rounded" placeholder="Password" type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Control className="bg-light text-dark border border-primary rounded" placeholder="Confirm Password" type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 bg-primary border border-primary rounded" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2 bg-light text-dark p-3 h-50">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      
    </Center>
  )
}
