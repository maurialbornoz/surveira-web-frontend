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