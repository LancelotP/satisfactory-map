import styled from "../../themes/styled";

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
      &.node_PURE {
        background-image: url(${require("../Icons/markers/iron_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/iron_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/iron_impure.png")});
      }
    }
    &.node_COPPER {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/copper_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/copper_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/copper_impure.png")});
      }
    }
    &.node_LIMESTONE {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/limestone_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/limestone_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/limestone_impure.png")});
      }
    }
    &.node_BAUXITE {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/bauxite_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/bauxite_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/bauxite_impure.png")});
      }
      
    }
    &.node_URANIUM {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/uranium_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/uranium_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/uranium_impure.png")});
      }
      
    }
    &.node_COAL {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/coal_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/coal_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/coal_impure.png")});
      }
      
    }
    &.node_OIL {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/oil_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/oil_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/oil_impure.png")});
      }
      
    }
    &.node_SULFUR {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/sulfur_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/sulfur_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/sulfur_impure.png")});
      }
      
    }
    &.node_QUARTZ {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/quartz_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/quartz_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/quartz_impure.png")});
      }
      
    }
    &.node_SAM {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/sam_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/sam_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/sam_impure.png")});
      }
      
    }
    &.node_CATERIUM {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/caterium_pure.png")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/caterium_normal.png")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/caterium_impure.png")});
      }
      
    }
    &.slug_GREEN {
      /* background-image: url(${greenSvg}); */
      
    }
    &.slug_YELLOW {
      /* background-image: url(${yellowSvg}); */
      
    }
    &.slug_PURPLE {
      /* background-image: url(${purpleSvg}); */
      
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
