import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Dashboard from "./DashBoard";
import Ranking from "./Ranking";
import Question from "./Question";
import AddQuestion from "./AddQuestion";
import WrongSide from "./WrongSide";
import PropTypes from "prop-types";

function Routes(props) {
  return (
    <div className="container">
      <Switch>
        {props.notLoggedIn ? (
          <Route path="/" exact component={Login} />
        ) : (
          <Fragment>
            <Route path="/" exact component={Dashboard} />
            <Route path="/leaderboard" exact component={Ranking} />
            <Route path="/add" exact component={AddQuestion} />
            <Route path="/questions/:id" exact component={Question} />
            <Route path="/logout" exact component={Logout} />
          </Fragment>
        )}
        <Route component={WrongSide} />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  notLoggedIn: PropTypes.any,
};

export default Routes;
