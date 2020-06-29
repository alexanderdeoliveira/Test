import React from 'react';
import { withRouter } from 'react-router-dom';

import { Container } from "./styles";

const Navbar = (props) => {

  return (
    <Container>
      <div className="navbar_row">
        <span className="navbar_title">
          {props.title}
        </span>
      </div>
    </Container>
  )
}

export default withRouter(Navbar);