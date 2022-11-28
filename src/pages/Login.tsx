import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/Col";
import Card from  "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import Alert from "react-bootstrap/esm/Alert"
import React, { useState } from "react";
import { loginUser} from "../services/UserService";
import { useAuthDispatch} from "../context/authContext";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<any>("")
    const [sendingUser, setSendingUser] = useState(false)

    const authDispatch = useAuthDispatch()

    const login = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setSendingUser(true)
            setError("")
            const res = await loginUser(email, password)
            const token = res.data.token
            authDispatch({
                type: 'login',
                token: token
            })
        } catch (errors: any) {
            if(errors.response){
                errors.response.status === 403 && setError("Invalid credentials")
            }
            //setError(errors.response)
            // console.log(errors.response)
            setSendingUser(false)
        }

    }


    return (
        <Container>
            <Row>
                <Col lg="5" md="10" sm="10" className="mx-auto">
                    <Card className="mt-5">
                        <Card.Body>
                            <h4>Log In</h4> <hr/>
                            <Form onSubmit={login}>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        type="email" placeholder="Email"
                                    ></Form.Control>
                   
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password" placeholder="Password"
                                    ></Form.Control>
                                 
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
                                        <span>Logging In</span>
                                    </> 
                                    : <> Log In</>}
                                </Button>
                            </Form>
                            <Alert className="mt-4" show={!!error} variant="danger">{error}</Alert>
                                
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;