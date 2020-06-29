import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;

  .table {
      width: 100%;
      border-collapse: collapse;
  }

  .table thead tr th,
  .table tfoot tr td,
  .table tbody tr td {
      border: 1px solid #888;
      padding: 8px 10px 7px;
      text-align: center;
  }

  .table tbody tr:nth-child(even) {
      background-color: #f2f2f2;
  }

  .table tbody tr:hover {
      background-color: #ddd;
      cursor: pointer;
  }

  .delete {
      color: #dc3545;
  }
`;