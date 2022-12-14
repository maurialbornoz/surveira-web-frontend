import { ChartData } from "chart.js"

export type User = {
    email: string,
    token: string,
    isAuthenticated: boolean
}

export type RouteType = "PRIVATE" | "PUBLIC" | "GUEST"

export type Route = {
    path: string, 
    component: any,
    routeType: RouteType
}

export type Poll = {
    id: string,
    errors: {},
    content: string,
    opened: boolean,
    questions: Array<Question>
}

export type Question = {
    id: string,
    content: string,
    questionOrder: number,
    type: QuestionType,
    answers: Array<Answer>
}

export type QuestionType = "RADIO" | "CHECKBOX" | "SELECT"

export type Answer = {
    id: string,
    content: string
}

export type UserAnswer = {
    questionId: number,
    answer: number,
    type: QuestionType
}
export type PollReplyDetail = {
    questionId: number,
    answerId: number
}
export type PollReply = {
    pollReplies: Array<PollReplyDetail>,
    user: string,
    poll: number
}
export type PollResultDetail = {
    answer: string,
    result: number
}
export type PollResult = {
    question: string,
    details: Array<PollResultDetail>
}

export type PollChartData = {
    data: ChartData<'bar'>,
    title: string,
    questionId: number
}


export type ChartType = "PIE" | "BAR"