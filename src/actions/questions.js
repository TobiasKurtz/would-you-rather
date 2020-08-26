export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_ANSWERED_QUESTION = "SAVE_ANSWERED_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function saveAnsweredQuestion(authedUser, qid, answer) {
  return {
    type: SAVE_ANSWERED_QUESTION,
    authedUser,
    qid,
    answer,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}
