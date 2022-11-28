import Form from "react-bootstrap/Form";
import {Circle, Square, Trash} from "react-bootstrap-icons";
import { usePollDispatch, usePollState } from "../../context/pollContext";

interface AnswerProps {
    questionIndex: number,
    answerIndex: number
}

const Answer = ({questionIndex, answerIndex} : AnswerProps) => {
    const poll = usePollState()
    const pollDispatch = usePollDispatch()

    const question = poll.questions[questionIndex]
    const answer = question.answers[answerIndex]
    const errors: any = poll.errors
    const errorKey = `questions[${questionIndex}].answers[${answerIndex}]`

    const renderIcon = () => {
        switch(question.type){
            case "SELECT":
                return <span className="me-1">{answerIndex + 1}.</span>
            case "RADIO":
                return <Circle className="me-1"></Circle>
            case "CHECKBOX":
                return <Square className="me-1"></Square>
        }
    }
    
    return ( 
        <>
            <div className="d-flex align-items-center mb-2 answer-item">
                {renderIcon()}
                <Form.Control
                    type="text"
                    value={answer.content}
                    placeholder="Answer"
                    onChange={(e) => pollDispatch({
                        type: "answer_content",
                        payload: {
                            answerindex: answerIndex,
                            index: questionIndex,
                            content: e.target.value
                        }
                    })}
                    isInvalid={!!errors[`${errorKey}.content`]}
                />
                <span data-tip="Delete answer">
                    <Trash 
                        className="ms-1 delete-answer"
                        onClick={() => pollDispatch({
                            type: "delete_answer",
                            payload: {
                                index: questionIndex,
                                answerId: answer.id
                            }
                        })}
                    >
                    </Trash>
                </span>

            </div>
            <div className="invalid-feedback d-block mb-2">
                {errors[`${errorKey}.content`]}
            </div>
        </>

     );
}
 
export default Answer;