import React from "react";
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/shared";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddQuestion extends React.Component {
  state = {
    optionOne: "",
    optionTwo: "",
    back: false,
  };

  handleAnswerOne = (event) => {
    event.preventDefault();
    this.setState({
      optionOne: event.target.value,
    });
  };

  handleAnswerTwo = (event) => {
    event.preventDefault();
    this.setState({
      optionTwo: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.addQuestion(optionOne, optionTwo);
    this.setState({ back: true });
  };

  render() {
    if (this.state.back) {
      return <Redirect to="/" />;
    }
    const { optionOne, optionTwo } = this.state;
    return (
      <Row>
        <Col md={{ offset: 4, size: 8 }} sm="12">
          <Card>
            <CardBody>
              <CardTitle>Would you rather</CardTitle>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="optionOne">Option one</Label>
                  <Input
                    type="text"
                    placeholder="option one"
                    name="optionOne"
                    value={optionOne}
                    onChange={this.handleAnswerOne}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="optionTwo">Option two</Label>
                  <Input
                    type="text"
                    placeholder="option two"
                    name="optionTwo"
                    value={optionTwo}
                    onChange={this.handleAnswerTwo}
                  />
                </FormGroup>
                <Button disabled={optionTwo === "" || optionOne === ""}>
                  AddQuestion
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

AddQuestion.propTypes = {
  authedUser: PropTypes.string,
  addQuestion: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    },
  };
}

export default connect(null, mapDispatchToProps)(AddQuestion);
