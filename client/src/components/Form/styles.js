import styled from "styled-components";

export const Container = styled.div`
  height: calc(100% - 64px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .form_center {
      height: 85%;
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .form_card {
      width: 100%;
  }

  .form_grid {
      width: 100%;
  }

  /* --------- */

  .form_card_calc {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .form-group_calc {
      width: 360px;
      padding: 10px 0px;
  }

  .form-group_calc input {
      width: 360px;
      padding: 8px 10px !important;
  }

  .form-group_calc button {
      width: 384px;
      padding: 8px 0px !important;
      background-color: #008CBA;
      border: none;
      color: white;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
  }
`;