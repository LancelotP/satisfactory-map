import styled from "../../themes/styled";

import ironSvg from "../Icons/markers/iron.svg";
import copperSvg from "../Icons/markers/copper.svg";
import limestoneSvg from "../Icons/markers/limestone.svg";
import bauxiteSvg from "../Icons/markers/bauxite.svg";
import uraniumSvg from "../Icons/markers/uranium.svg";
import coalSvg from "../Icons/markers/coal.svg";
import oilSvg from "../Icons/markers/oil.svg";
import sulfurSvg from "../Icons/markers/sulfur.svg";
import quartzSvg from "../Icons/markers/quartz.svg";
import samSvg from "../Icons/markers/sam.svg";
import cateriumSvg from "../Icons/markers/caterium.svg";

export const Root = styled.div`
  position: relative;
  display: flex;
  height: 100%;

  & .leaflet-container {
    background-color: #7b7b75;
  }

  & .leaflet-marker-icon {
    background: none;
    border: none;

    background: transparent center bottom no-repeat / contain;

    &.node_IRON {
      background-image: url(${ironSvg});
    }
    &.node_COPPER {
      background-image: url(${copperSvg});
    }
    &.node_LIMESTONE {
      background-image: url(${limestoneSvg});
    }
    &.node_BAUXITE {
      background-image: url(${bauxiteSvg});
    }
    &.node_URANIUM {
      background-image: url(${uraniumSvg});
    }
    &.node_COAL {
      background-image: url(${coalSvg});
    }
    &.node_OIL {
      background-image: url(${oilSvg});
    }
    &.node_SULFUR {
      background-image: url(${sulfurSvg});
    }
    &.node_QUARTZ {
      background-image: url(${quartzSvg});
    }
    &.node_SAM {
      background-image: url(${samSvg});
    }
    &.node_CATERIUM {
      background-image: url(${cateriumSvg});
    }
  }
`;

export const Overlay = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Modal = styled.div`
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 48px;
  flex: 1 1 auto;
`;

export const ModalTop = styled.div`
  padding: 24px;
`;

export const ModalContent = styled.div`
  padding: 0 24px;
`;

export const ModalBottom = styled.div`
  display: flex;
  padding: 16px 24px;
  align-items: center;
  justify-content: flex-end;
`;
