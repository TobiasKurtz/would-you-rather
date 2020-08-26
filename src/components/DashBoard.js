import React from "react";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";
import classnames from "classnames";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import PropTypes from "prop-types";

class DashBoard extends React.PureComponent {
  state = {
    activeTab: "1",
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { questionsAnswered, questionNotAnswered } = this.props;

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Unanswered
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Answered
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              {questionNotAnswered.map((qid) => (
                <Col key={qid} sm="6" md="4">
                  <QuestionCard id={qid} />
                </Col>
              ))}
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              {questionsAnswered.map((qid) => (
                <Col key={qid} sm="6" md="4">
                  <QuestionCard id={qid} />
                </Col>
              ))}
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

DashBoard.propTypes = {
  answeredPolls: PropTypes.array,
  unansweredPolls: PropTypes.array,
};

function mapStateToProps({ questions, users, authedUser }) {
  const user = users[authedUser];
  const questionsAnswered = Object.keys(user.answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  return {
    questionsAnswered,
    questionNotAnswered: Object.keys(questions)
      .filter((queId) => !questionsAnswered.includes(queId))
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  };
}

export default connect(mapStateToProps)(DashBoard);
