import { usePollDispatch, usePollState } from "../../context/pollContext";
import Question from "./Question";
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button";
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd"
import {v4 as uuidv4} from 'uuid';
import { savePoll } from "../../services/PollService";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";

const Poll = () => {
    const [showToast, setShowToast] = useState(false)
    const [sendingData, setSendingData] = useState(false)

    const poll = usePollState()
    const pollDispatch = usePollDispatch()
    const errors: any = poll.errors

    

    const renderQuestions = () => {
        return poll.questions.map((q, index) => {
            return <Draggable key={q.id} draggableId={q.id.toString()} index={index}>
                {
                    (provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Question index={index}></Question>
                        </div>
                    )
                }
            </Draggable>
        })
    }

    
    const handleOnDragEnd = (result : DropResult) => {
        if(!result.destination) return
        if(result.source.index === result.destination.index) return
        pollDispatch({
            type: "order_questions",
            payload: {
                source: result.source.index,
                destination: result.destination.index
            }
        })
    }

    const createPoll = async () => {
        const data = {
            content: poll.content,
            opened: poll.opened,
            questions: poll.questions
        }

        try {
            setSendingData(true)
            await savePoll(data)
            pollDispatch({
                type: "reset_poll_form"
            })
            setShowToast(true)
            setSendingData(false)

        } catch (errors: any) {
            if(errors.response && errors.response.status === 400) {
                
                pollDispatch({
                    type: "set_errors",
                    errors: errors.response.data.errors
                })
            }
            setSendingData(false)

        }
    }

    return ( 
        <Container className="mt-5 mb-5">
            <Row>
                <Col className="mx-auto" sm="10" md="10" lg="8" >
                    <FloatingLabel controlId="poll_content" label="Survey Title">
                        <Form.Control
                            value={poll.content}
                            onChange={e => pollDispatch({
                                type: "poll_content",
                                content: e.target.value
                            })}
                            size="lg"
                            type="text"
                            placeholder="Survey Title"
                            isInvalid={!!errors?.content}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors?.content}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId={uuidv4()}>
                            {
                                (provided) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {renderQuestions()}
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                        </Droppable>
                    </DragDropContext>
                    <Button 
                        size="lg"
                        variant="outline-success"
                        onClick={createPoll}
                        className="mt-5"
                    >
                        {sendingData 
                            ? 
                            <>
                                <Spinner 
                                    animation="border"
                                    as="span"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"

                                ></Spinner>&nbsp;
                                <span>Creating Survey</span>
                            </> 
                            : <> Create Survey</>}
                    </Button>
                </Col>
            </Row>

            <ToastContainer position="bottom-center">

                <Toast onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
                    <Toast.Header closeButton={false} >
                        <span>Survey created successfully</span>
                    </Toast.Header>
                    {/* <Toast.Body>Survey Link:</Toast.Body> */}
                </Toast>
            </ToastContainer>
        </Container>
     );
}
 
export default Poll;