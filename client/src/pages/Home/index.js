import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Toolbar from '../../components/Toolbar';
import Form from '../../components/Form';

import { Container } from './styles';
import request from '../../services/request';

import { logout } from '../../services/auth';

const Home = (props) => {

  useEffect(() => {
    request.get('api/v1/auth')
      .catch((err) => {
        logout();
        props.history.push("/signin");
      });
  });

  return (
    <Container>
      <Toolbar />
      <Form />
    </Container>
  );
}

export default withRouter(Home);
