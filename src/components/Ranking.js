import React, { Fragment } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Ranking(props) {
  const { users } = props;
  return (
    <Fragment>
      <Table>
        <thead>
          <tr>
            <th>Place</th>
            <th>User</th>
            <th>Profile</th>
            <th>Number of answered questions</th>
            <th>Number of asked questions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>
                <img
                  className="avatar"
                  alt={"Avatar of " + user.name}
                  src={user.avatarURL}
                />
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
}

Ranking.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = ({ users }) => {
  const userPoints = (user) =>
    Object.keys(user.answers).length + user.questions.length;
  return {
    users: Object.values(users).sort((a, b) => userPoints(b) - userPoints(a)),
  };
};
export default connect(mapStateToProps)(Ranking);
