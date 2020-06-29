import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import request from '../../services/request';

import { Container } from "./styles";

const Historic = (props) => {
  const historic = useSelector(state => state.data);
  const dispatch = useDispatch();

  const removeHistoric = (e, historic) => {
    e.preventDefault();

    request.delete(`/api/v1/historic/${historic.id}`)
      .catch((err) => console.log('Erro ao excluir historico'));

    dispatch({ type: 'REMOVE', historic })
  };

  const getDate = value => {
    const info = new Date(value);
    let date = info.toISOString().slice(0, 10).replace('-', '/').replace('-', '/');
    let time = info.toISOString().slice(11, 19);

    return `${date} - ${time}`;
  }

  const getText = item => {
    const value = item.textA
      .split('')
      .map((c, index) => {
        let sel = item.foundIndexes.find((i) => i === index);

        if (typeof sel != 'undefined') {
          return <u key={index}>{c}</u>;
        }

        return c;
      });

    return value;
  }

  return (
    <Container>
      <table className="table">
        <thead>
          <tr>
            <th>N</th>
            <th>Text A</th>
            <th>Text B</th>
            <th>Result</th>
            <th>DateTime</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            historic.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{getText(item)}</td>
                <td>{item.textB}</td>
                <td>{item.result ? 'Yes' : 'NO'}</td>
                <td>{getDate(item.date)}</td>
                <td><i className="material-icons md-24 delete" onClick={e => removeHistoric(e, item)}>delete</i></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Container>
  );
}

export default withRouter(Historic);