import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import request from '../../services/request';

import Navbar from '../Navbar';
import Historic from '../Historic';

import { Container } from './styles';

function Form() {
  const [A, setA] = useState('');
  const [B, setB] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const calculate = async e => {
    e.preventDefault();

    if (!A || !B) {
      setError('Preencha os campos corretamente para continuar!');
    } else {
      await request.post('/api/v1/historic', { stringA: A, stringB: B })
        .then((res) => {
          dispatch({ type: 'ADD', historic: res.data });
          setA('');
          setB('');
          setError('');
        })
        .catch((err) => setError('Erro ao calcular!'));
    }
  };

  useEffect(() => {
    request.get('/api/v1/historic')
      .then((res) => {
        dispatch({ type: 'GET', historic: res.data });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <Container>
      <div className='form_center'>
        <div className='form_card'>
          <Navbar title='Calculate' />

          <form className='form_card_calc' onSubmit={calculate}>
            <div className='form-group_calc'>
              <input
                type='text'
                placeholder='A'
                value={A}
                onChange={e => setA(e.target.value)}
                required
              />
            </div>

            <div className='form-group_calc'>
              <input
                type='text'
                placeholder='B'
                value={B}
                onChange={e => setB(e.target.value)}
                required
              />
            </div>

            {error && <p>{error}</p>}

            <div className='form-group_calc'>
              <button type='submit'>Send</button>
            </div>
          </form>
        </div>

        <div className='form_grid'>
          <Navbar title='Historic' />
          <Historic />
        </div>
      </div>
    </Container>
  )
}

export default withRouter(Form);