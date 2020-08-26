import React from "react";
import { connect } from "react-redux";
import { unsetAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  componentWillMount() {
    this.props.dispatch(unsetAuthedUser());
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default connect()(Logout);
