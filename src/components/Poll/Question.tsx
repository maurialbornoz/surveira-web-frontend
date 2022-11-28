import { usePollDispatch, usePollState } from "../../context/pollContext";
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { questionTypeOptions } from "../../utils/constants";
import Answer from "./Answer";
import Button from "react-bootstrap/Button";
import {PlusLg, Trash, PlusCircle} from "react-bootstrap-icons";
import ReactTooltip from "react-tooltip";
import { useEffect } from "react";

interface QuestionProps {
    index: number
}

const Question = ({index} : QuestionProps) => {
    const poll = usePollState()
    const pollDispatch = usePollDispatch()

    const question = poll.questions[index]
    const errors: any = poll.errors
    const errorKey = `questions[${index}]`

    useEffect(() => {
        ReactTooltip.rebuild()
    }, [question.answers.length])

    const renderAnswers = () => {
        return question.answers.map((a, answerIndex) => {
            return (
                <Answer 
                    key={a.id} 
                    questionIndex={index} 
                    answerIndex={answerIndex}
                ></Answer>
            )
        })
    }

    return ( 
        <Card className="mt-3">
            <Card.Body>
                <Row>
                    <Col sm="12" md="6" className="mb-4">
                        <Form.Control 
                            type="text"
                            placeholder="Question"
                            value={question.content}
                            onChange={(e) => pollDispatch({
                                type: "question_content",
                                payload: {
                                    content: e.target.value,
                                    index
                                }
                            })}
                            isInvalid={!!errors[`${errorKey}.content`]}

                        />
                        <Form.Control.Feedback type="invalid">
                            {errors[`${errorKey}.content`]}
                        </Form.Control.Feedback>
                    </Col>
                    <Col sm="12" md="6" className="mb-4">
                        <Form.Control 
                            as="select"
                            className="form-select"
                            value={question.type}
                            onChange={(e) => pollDispatch({
                                type: "change_question_type",
                                payload: {
                                    index,
                                    value: e.target.value
                                }
                            })}
                            isInvalid={!!errors[`${errorKey}.type`]}

                        >
                            <option>Question Type</option>
                            {
                                questionTypeOptions.map(option => {
                                    return <option key={option.value} value={option.value}>{option.name}</option>
                                })
                            }
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors[`${errorKey}.type`]}
                        </Form.Control.Feedback>
                    </Col>
                </Row>
                <Container>
                    {renderAnswers()}
                    <Button size="sm" className="mt-2" variant="outline-primary"
                        onClick={() => pollDispatch({
                            type: "new_answer",
                            index
                        })}
                    >
                        <PlusLg /> Add Answer
                    </Button>
                </Container>
            </Card.Body>
            <hr/>
            <div className="d-flex justify-content-end">
                <span data-tip="Add question">
                    <PlusCircle className="option-question-icon m-3"
                        onClick={() => pollDispatch({
                            type: "new_question",
                            index
                        })}
                    />  
                </span>
                <span data-tip="Delete question">
                    <Trash className="option-question-icon m-3"
                        onClick={() => pollDispatch({
                            type: "delete_question",
                            questionId: question.id
                        })}
                    />  
                </span>
            </div>

            <ReactTooltip place="left" effect="solid"/>
        </Card>
     );
}
 
export default Question;