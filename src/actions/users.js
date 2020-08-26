export const RECEIVE_USERS = "RECEIVE_USERS";
export const USER_QUESTION_ANSWERED = "USER_QUESTION_ANSWERED";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function userQuestionAnswered(authedUser, qid, option) {
  return {
    type: USER_QUESTION_ANSWERED,
    authedUser,
    qid,
    option,
  };
}

export function addUserQuestion(authedUser, qid) {
  return {
    type: ADD_USER_QUESTION,
    authedUser,
    qid,
  };
}
