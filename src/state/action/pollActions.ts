export type PollActions = 
{ type: 'poll_content', content: string} |
{ type: 'question_content', payload: {index: number, content: string}} |
{ type: 'answer_content', payload: {index: number, answerindex:number, content: string}} |
{ type: 'change_question_type', payload: {index: number, value:string}} |
{ type: 'new_question', index: number} |
{ type: 'new_answer', index: number} |
{ type: 'delete_question', questionId: String} |
{ type: 'delete_answer', payload: {index: number, answerId: string}} |
{ type: 'order_questions', payload: {source: number, destination: number}} |
{ type: 'set_errors', errors: {}} |
{ type: 'reset_poll_form'}