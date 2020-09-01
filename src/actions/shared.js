import { getInitialData } from "../utils/api";
import {
  receiveUsers,
  addUserQuestion,
  userQuestionAnswered,
} from "../actions/users";
import {
  receiveQuestions,
  addQuestion,
  saveAnsweredQuestion,
} from "../actions/questions";
import { _saveQuestionAnswer, _saveQuestion } from "../utils/_DATA";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(authedUser, question.id));
    });
  };
}

export function handleAnswer(qid, option) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const info = {
      authedUser: authedUser,
      qid,
      answer: option,
    };
    _saveQuestionAnswer(info).then(() => {
      dispatch(saveAnsweredQuestion(authedUser, qid, option));
      dispatch(userQuestionAnswered(authedUser, qid, option));
    });
  };
}
