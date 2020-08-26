import React, { Fragment } from "react";
import {
  Nav,
  NavLink,
  Navbar,
  NavbarToggler,
  NavItem,
  NavbarBrand,
  Collapse,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import User from "./User";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Navigation extends React.PureComponent {
  state = {
    closed: false,
  };

  change = () => {
    this.setState({
      closed: !this.state.closed,
    });
  };

  render() {
    const { authedUser } = this.props;
    return (
      <div>
        <Navbar variant="light" bg="primary" expand="md">
          <NavbarBrand tag={Link} to="/">
            Would you rather
          </NavbarBrand>
          {authedUser && (
            <Fragment>
              <NavbarToggler onClick={this.change} />
              <Collapse isOpen={!this.state.closed} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink tag={Link} to="/leaderboard">
                      Ranklist
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/add">
                      Add question
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/logout">
                      Logout
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <User id={authedUser} />
                  </NavItem>
                </Nav>
              </Collapse>
            </Fragment>
          )}
        </Navbar>
      </div>
    );
  }
}

Navigation.propTypes = {
  authedUser: PropTypes.string,
};

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default withRouter(connect(mapStateToProps, null)(Navigation));
