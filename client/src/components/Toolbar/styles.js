import styled from "styled-components";

export const Container = styled.div`
  height: 64px;
  width: 100%;
  background-color: #008CBA;
  display: flex;
  align-items: center;

  .row {
    width: 100%;
    align-items: center;
    display: flex;
    color: white;
    padding: 0px 26px;
    box-sizing: border-box;
    flex-direction: row;
    white-space: nowrap;
  }

  .title {
    font-size: 20px;
    font-weight: 500;
    flex: 1 1 auto;
  }

  .btn {
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
    padding: 8px;
  }

  .btn:hover {
    color: white;
  }
`;