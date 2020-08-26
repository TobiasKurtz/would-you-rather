import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Card, CardTitle, CardBody } from "reactstrap";
import PropTypes from "prop-types";

class QuestionCard extends React.Component {
  constuctor() {
    this.loadQuestions = this.routeChange.bind(this);
  }

  loadQuestions(e, questionId) {
    let path = "/questions/" + questionId;
    this.props.history.push(path);
  }

  render() {
    const { question, authedUser } = this.props;
    return (
      <Card onClick={(e) => this.loadQuestions(e, question.id)}>
        <CardBody>
          <CardTitle>Would you rather</CardTitle>
          <ul>
            <li
              className={
                question.optionOne.votes.includes(authedUser)
                  ? "optionsSelected"
                  : ""
              }
            >
              {" "}
              {question.optionOne.text}
            </li>
            <li
              className={
                question.optionTwo.votes.includes(authedUser)
                  ? "optionsSelected"
                  : ""
              }
            >
              {question.optionTwo.text}
            </li>
          </ul>
        </CardBody>
      </Card>
    );
  }
}

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToprops(state, { id }) {
  return {
    question: state.questions[id],
    authedUser: state.authedUser,
  };
}

export default withRouter(connect(mapStateToprops, null)(QuestionCard));
