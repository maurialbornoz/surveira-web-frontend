import { Poll, Question, QuestionType } from "../../types";
import {v4 as uuidv4} from 'uuid';
import { PollActions } from "../action/pollActions";
import produce from "immer";
import { 
    MAXIMUN_QUESTION_LIMIT,
    MAXIMUM_LIMIT_ANSWERS_PER_QUESTION, 
    MINIMUM_LIMIT_ANSWERS_PER_QUESTION,
    MINIMUM_QUESTION_LIMIT
} from "../../utils/constants";
const defaultQuestion: Question = {
    id: uuidv4(),
    content: "",
    questionOrder: 1,
    type: "CHECKBOX",
    answers: [
        {
            id: uuidv4(),
            content: ""
        }
    ]

}
const defaultPoll: Poll = {
    id: uuidv4(),
    content: "",
    errors: {},
    opened: true,
    questions: [defaultQuestion]

}


export const pollInitialState: Poll = {
    ...defaultPoll
}

const orderQuestions = (state: Poll) => {
    for(let i=0; i<state.questions.length; i++){
        state.questions[i].questionOrder = i + 1
    }
}

export const PollReducer = produce((state: Poll, action: PollActions) : Poll => {
    switch(action.type) {
        case "poll_content" : {
            state.content = action.content
            return state
        }
        case "question_content": {
            state.questions[action.payload.index].content = action.payload.content
            return state
        }
        case "change_question_type": {
            let questionType: QuestionType = action.payload.value as QuestionType
            state.questions[action.payload.index].type = questionType
            return state
        }
        case "answer_content" : {
            state.questions[action.payload.index].answers[action.payload.answerindex].content = action.payload.content
            return state
        }
        case "new_question" : {
            if(state.questions.length >= MAXIMUN_QUESTION_LIMIT){
                return state
            }
            const questionOrder = state.questions[state.questions.length - 1].questionOrder + 1
            state.questions.splice(action.index + 1 , 0, {...defaultQuestion, id: uuidv4(), questionOrder})
            orderQuestions(state)
            return state
        }
        case "new_answer": {
            if(state.questions[action.index].answers.length >= MAXIMUM_LIMIT_ANSWERS_PER_QUESTION){
                return state
            }
            state.questions[action.index].answers.push({id: uuidv4(), content: ""})
            return state
        }
        case "delete_answer": {
            const {index, answerId} = action.payload
            if(state.questions[index].answers.length > MINIMUM_LIMIT_ANSWERS_PER_QUESTION){
                state.questions[index].answers = state.questions[index].answers.filter(a => a.id !== answerId)
            }
            state.errors = {}
            return state
        }
        case "delete_question": {
            if(state.questions.length > MINIMUM_QUESTION_LIMIT){
                state.questions = state.questions.filter(q => q.id !== action.questionId)
            }
            state.errors = {}
            return state
        }
        case "order_questions": {
            const {source, destination} = action.payload
            const [question] = state.questions.splice(source, 1) 
            state.questions.splice(destination, 0, question)
            orderQuestions(state)
            state.errors = {}
            return state
        }
        case "set_errors": {
            state.errors = action.errors
            return state
        }
        case "reset_poll_form": {
            state = { ...defaultPoll }
            return state
        }
        default: 
            return state
    }
}) 