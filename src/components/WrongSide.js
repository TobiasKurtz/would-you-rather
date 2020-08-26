import React from "react";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import CardTitle from "reactstrap/es/CardTitle";
import PropTypes from "prop-types";

const WrongSide = ({ history }) => (
  <Card>
    <CardHeader>404</CardHeader>
    <CardBody>
      <CardTitle>Page not found</CardTitle>
      <Button size="normal" color="primary" onClick={() => history.push("/")}>
        Home
      </Button>
    </CardBody>
  </Card>
);

WrongSide.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default WrongSide;
