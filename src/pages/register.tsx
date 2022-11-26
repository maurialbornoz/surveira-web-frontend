import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Card from  "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import React, { useState } from "react";
import { loginUser, registerUser } from "../services/UserService";
import { useAuthDispatch } from "../context/authContext";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<any>({})
    const [sendingUser, setSendingUser] = useState(false)

    const authDispatch = useAuthDispatch()


    const register = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setSendingUser(true)
            await registerUser(name, email, password)
            const res = await loginUser(email, password)
            const token = res.data.token
            authDispatch({
                type: 'login',
                token: token
            })
        } catch (errors: any) {
            if(errors.response){
                errors.response.status === 400 && setErrors(errors.response.data.errors)
            }
            
            setSendingUser(false)
        }

    }
    return (
        <Container>
            <Row>
                <Col lg="5" md="10" sm="10" className="mx-auto">
                    <Card className="mt-5">
                        <Card.Body>
                            <h4>Create Account</h4> <hr/>
                            <Form onSubmit={register}>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        isInvalid={!!errors?.name}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        type="text" placeholder="Name"
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.name}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        isInvalid={!!errors?.email}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        type="email" placeholder="Email"
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        isInvalid={!!errors?.password}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password" placeholder="Password"
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors?.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit">
                                    {sendingUser 
                                    ? 
                                    <>
                                        <Spinner 
                                            animation="border"
                                            as="span"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"

                                        ></Spinner>&nbsp;
                                        <span>Creating Account</span>
                                    </> 
                                    : <> Create Account</>}
                                </Button>
                            </Form>
                                
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Register;