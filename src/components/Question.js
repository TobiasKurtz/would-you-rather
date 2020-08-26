import React, { PureComponent } from "react";
import {
  Card,
  Row,
  Col,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
} from "reactstrap";
import { connect } from "react-redux";
import User from "./User";
import { handleAnswer } from "../actions/shared";
import PropTypes from "prop-types";

class Question extends PureComponent {
  state = {
    answerGiven: "",
  };

  givenAnswer = (e) => {
    this.setState({
      answerGiven: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveAnsweredQuestion(this.state.answerGiven);
  };

  render() {
    const {
      question,
      questionAuthor,
      answer,
      percentOne,
      percentTwo,
      total,
    } = this.props;
    const { answerGiven } = this.state;

    return (
      <Row>
        <Col md={{ offset: 3, size: 6 }} sm="12">
          <Card>
            <CardHeader>
              <User id={questionAuthor.id} />
            </CardHeader>
            <CardBody>
              <CardTitle>Would you rather</CardTitle>
              {answer ? (
                <div>
                  <FormGroup>
                    <FormGroup check disabled>
                      <label check>
                        <Input
                          type="radio"
                          checked={answer === "optionOne"}
                          readOnly
                        />{" "}
                        {question.optionOne.text}
                      </label>
                    </FormGroup>
                    <FormGroup check disabled>
                      <label check>
                        <Input
                          type="radio"
                          checked={answer === "optionTwo"}
                          readOnly
                        />{" "}
                        {question.optionTwo.text}
                      </label>
                    </FormGroup>
                  </FormGroup>
                  <div className="progress">
                    <div
                      className="progress-one"
                      style={{ width: `${percentOne}%` }}
                    >
                      {`${percentOne}%`}
                    </div>
                    <div
                      className="progress-two"
                      style={{ width: `${percentTwo}%` }}
                    >
                      {`${percentTwo}%`}
                    </div>
                  </div>
                  <div className="total">Total Number of votes: {total}</div>
                </div>
              ) : (
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup tag="fieldset">
                    <FormGroup>
                      <Label>
                        <Input
                          type="radio"
                          name="radio1"
                          value="optionOne"
                          onChange={this.givenAnswer}
                        />{" "}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        <Input
                          type="radio"
                          name="radio1"
                          value="optionTwo"
                          onChange={this.givenAnswer}
                        />{" "}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <Button disabled={answerGiven === ""}>Answer</Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

Question.propTypes = {
  question: PropTypes.object,
  questionAuthor: PropTypes.object,
  answer: PropTypes.string,
  percOne: PropTypes.string.isRequired,
  percTwo: PropTypes.string.isRequired,
};

function financial(a) {
  return Number.parseFloat(a).toFixed(2);
}

function mapStateToProps({ questions, users, authedUser }, { match }) {
  const answers = users[authedUser].answers;
  let answer, percentOne, percentTwo, total;
  const { id } = match.params;
  const question = questions[id];
  if (answers.hasOwnProperty(question.id)) {
    answer = answers[question.id];
  }
  const questionAuthor = users[question.author];
  total = question.optionOne.votes.length + question.optionTwo.votes.length;
  percentOne = financial((question.optionOne.votes.length / total) * 100);
  percentTwo = financial((question.optionTwo.votes.length / total) * 100);
  return {
    question,
    questionAuthor,
    answer,
    total,
    percentOne,
    percentTwo,
  };
}

function mapDispatchTProps(dispatch, props) {
  const { id } = props.match.params;
  return {
    saveAnsweredQuestion: (answer) => {
      dispatch(handleAnswer(id, answer));
    },
  };
}

export default connect(mapStateToProps, mapDispatchTProps)(Question);
