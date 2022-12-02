import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { createPollReply, getPollWithQuestions } from "../../services/PollService";
import { PollReplyDetail, Question, UserAnswer } from "../../types";
import ReplyQuestion from "./ReplyQuestions";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/esm/Spinner";

import {Check2Circle} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

interface PollProps {
    id: string
}



const Poll = ({id}: PollProps) => {
    const navigate = useNavigate()

    const [poll, setPoll ] = useState<any>(null)
    const [user, setUser] = useState<string>("")
    const [errors, setErrors] = useState<any>({})
    const [userAnswers, setUserAnswers] = useState<any>({})
    const [pollAnswered, setPollAnswered] = useState<boolean>(false)
    const [sendingPoll, setSendingPoll] = useState<boolean>(false)

    useEffect(() => {
        fetchPoll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchPoll = async () => {
        try {
            const res: any = await getPollWithQuestions(id)
            const {data} = res
            data.questions = data.questions.sort((a: Question, b:Question) => a.questionOrder - b.questionOrder)
            setPoll(data)
        } catch (error: any) {
            if(error.response.status === 500){
                // poll doesn't exist or is closed
                navigate("/")
            }
        }
    }

    const handleQuestionChange = (answer: UserAnswer) => {
        const answers = {...userAnswers}
        switch(answer.type){
            case "RADIO":
            case "SELECT": {
                answers[answer.questionId] = {questionId: answer.questionId, answerId: answer.answer}
                break
            }
            case "CHECKBOX": {
                if(answers[answer.questionId]){
                    const array = answers[answer.questionId].answers
                    const index = array.indexOf(answer.answer)
                    if(index === -1) {
                        array.push(answer.answer)
                    } else {
                        array.length < 2 ? delete answers[answer.questionId] : array.splice(index, 1)
                    }
                } else {
                    answers[answer.questionId] = {questionId: answer.questionId, answers: [answer.answer]}
                }
                break
            }
        }
        setUserAnswers(answers)
    }

    const renderQuestions = () => {
        return poll.questions.map((q: Question) => {
            return (
                <ReplyQuestion
                    changeCallback={handleQuestionChange}
                    question={q}
                    key={q.id}
                ></ReplyQuestion>
            )
        })
    }

    const prepareForm = () => {
        setErrors({})
        if(Object.keys(userAnswers).length !== poll.questions.length){
            setErrors((currentErrors: any) => {
                    return {...currentErrors, allQuestionsShouldBeAnswered: "You should answer all questions."}
            })
        }

        let replies: Array<PollReplyDetail> = []
        for (let key in userAnswers) {
            if(userAnswers[key].answers){ // IF CHECKBOX
                userAnswers[key].answers.forEach((id: number) => replies.push({
                    questionId: userAnswers[key].questionId, answerId: id
                }))
            } else { // RADIO OR SELECT
                replies.push(userAnswers[key])
            }
        }
        sendForm(replies)
    }

    const sendForm = async (replies: Array<PollReplyDetail>) => {
        try {
            setSendingPoll(true)
            await createPollReply({
                pollReplies: replies,
                poll: poll.id,
                user: user
            })
            setSendingPoll(false)
            setPollAnswered(true)
        } catch (errors: any) {
            if(errors.response){
                errors.response.status === 400 && setErrors(errors.response.data.errors)
            }
            setSendingPoll(false)
        }
    }

    return (
        <Container>
            <Row>
                <Col sm="10" md="10" lg="8" className="mx-auto mt-5 mb-5">
                    {
                        pollAnswered &&
                        <div className="d-flex align-items-center flex-column poll-answered-container">
                            <Check2Circle className="success-icon"></Check2Circle>
                            <Alert show={pollAnswered} variant="success">
                                "Survey answered successfully"
                            </Alert>
                        </div>
                    }
                    {
                        poll && !pollAnswered && <>
                            <h2>{poll.content}</h2><hr></hr>
                            <Form.Group className="mb-3" controlId="user">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    value={user}
                                    onChange={e => setUser(e.target.value)}
                                    type="text"
                                    placeholder="Name"
                                    isInvalid={!!errors.user}
                                ></Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    {errors.user}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div>
                                {renderQuestions()}
                            </div>
                            <Button type="submit" onClick={prepareForm}>
                                    {sendingPoll
                                    ?
                                    <>
                                        <Spinner
                                            animation="border"
                                            as="span"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            
                                        ></Spinner>&nbsp;
                                        <span>Sending Survey</span>
                                    </>
                                    : <>Send Survey</>}
                                </Button>
                            {errors.allQuestionsShouldBeAnswered && <Alert className="mt-4" variant="danger">{errors.allQuestionsShouldBeAnswered}</Alert>}
                        </>
                    }
                </Col>
            </Row>
        </Container>
     );
}

export default Poll;