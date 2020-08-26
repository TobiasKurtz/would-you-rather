import React from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import PropTypes from "prop-types";

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
    };
    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { userId } = this.state;
    const { authenticate } = this.props;
    if (userId) {
      console.log("geht: ", { userId });
      authenticate(userId);
    } else {
      console.log("userID: ", { userId });
      alert("Error. Select a User.");
    }
    event.preventDefault();
  }

  handleChangeUser(event) {
    this.setState({ userId: event.target.value });
  }

  render() {
    const { users } = this.props;
    const { userId } = this.state;

    return (
      <Row>
        <Col md={{ size: 3, offset: 3 }} sm="9">
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="userSelect">Choose User</Label>
              <Input
                type="select"
                name="select"
                id="userSelect"
                value={userId}
                onChange={this.handleChangeUser}
              >
                <option value="" disabled>
                  Choose
                </option>
                {Object.keys(users).map((user) => (
                  <option key={user} value={user}>
                    {users[user].name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <input disabled={userId === ""} type="submit" value="Login" />
          </Form>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  users: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired,
};

function mapStateToProps({ users }) {
  return {
    users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (id) => {
      dispatch(setAuthedUser(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
