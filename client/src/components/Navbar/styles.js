import styled from "styled-components";

export const Container = styled.div`
  height: 44px;
  width: 100%;
  background-color: #008CBA;
  display: flex;
  align-items: center;

  .navbar_row {
      width: 100%;
      align-items: center;
      display: flex;
      color: white;
      padding: 0px 26px;
      box-sizing: border-box;
      flex-direction: row;
      white-space: nowrap;
  }

  .navbar_title {
      font-size: 16px;
      font-weight: 500;
      flex: 1 1 auto;
  }

  .navbar_btn {
      color: rgba(255, 255, 255, 0.85);
      cursor: pointer;
      padding: 8px;
  }

  .navbar_btn:hover {
      color: white;
  }
`;