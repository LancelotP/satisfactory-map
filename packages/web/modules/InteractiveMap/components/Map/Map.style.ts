import styled from "../../../../themes/styled";

export const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  & > .leaflet-container {
    width: 100%;
    height: 100%;
    background-color: #494947;
  }
`;

export const ToggleMenu = styled.div`
  position: absolute;
  background: white;
  transform: rotate(45deg);
  width: 70px;
  height: 70px;
  top: 50%;
  left: -35px;
  z-index: 1000;
  cursor: pointer;

  @media (min-width: 1200px) {
    display: none;
  }

  & > img {
    transform: rotate(-45deg);
    margin-top: 10px;
    margin-left: 35px;
    width: 25px;
  }
`;
