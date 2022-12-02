import Form from "react-bootstrap/esm/Form";
import { Question, UserAnswer } from "../../types";

interface ReplyQuestionsProps {
    question: Question,
    changeCallback: Function
}

const ReplyQuestion = ({question, changeCallback} : ReplyQuestionsProps) => {
    const renderAnswers = () => {
        switch(question.type){
            case "RADIO": 
            case "CHECKBOX" :
                return question.answers.map(a => {
                    return (
                        <div key={a.id} className="mb-2">
                            <Form.Check
                                onChange={(e) => {
                                    const data: UserAnswer = {
                                        questionId: parseInt(question.id),
                                        answer: parseInt(e.target.value),
                                        type: question.type
                                    }
                                    changeCallback(data)

                                }}
                                value={a.id}
                                type={question.type === "RADIO" ? "radio" : "checkbox"}
                                name={question.id}
                                id={a.id}
                                label={a.content}

                            />

                           
                        </div>
                    )
                })
            case "SELECT":
                return (
                    <div className="mb-2">
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                const data: UserAnswer = {
                                    questionId: parseInt(question.id),
                                    answer: parseInt(e.target.value),
                                    type: question.type
                                }
                                changeCallback(data)
                            }}                            className="form-select"

                        >
                            <option value="">Select an option</option>
                            {
                                question.answers.map(a => {
                                    return <option value={a.id} key={a.id}>{a.content}</option>
                                })
                            }
                        </Form.Control>
                    </div>
                )
        }   
    }

    return ( 
        <div className="mb-4">
            <h6>{question.content}</h6>
            {renderAnswers()}
        </div>
     );
}
 
export default ReplyQuestion;