import React from "react";
import { withRouter } from "react-router-dom";

import { logout, getUser } from "../../services/auth";

import { Container } from "./styles";

const Toolbar = (props) => {

  const onlogout = async e => {
    e.preventDefault();

    logout();

    props.history.push("/signin");
  };

  return (
    <Container>
      <div className="row">
        <span className="title">
          {getUser().name}
        </span>

        <div className="btn">
          <i className="material-icons md-24" onClick={onlogout}>exit_to_app</i>
        </div>
      </div>
    </Container>
  )
}

export default withRouter(Toolbar);