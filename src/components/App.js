import React, { Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Navigation from "./Navigation";
import PropTypes from "prop-types";

class App extends React.Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { notLoggedIn } = this.props;
    return (
      <Router>
        <Fragment>
          <div className="main-container">
            <Navigation />
            <Routes notLoggedIn={notLoggedIn} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  handleInitialData: PropTypes.func.isRequired,
  notLoggedIn: PropTypes.bool.isRequired,
};

function mapStateToProps({ authedUser }) {
  return {
    notLoggedIn: authedUser === null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleInitialData: () => {
      dispatch(handleInitialData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
