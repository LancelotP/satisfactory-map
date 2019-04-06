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
        background-image: url(${require("../Icons/markers/iron_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/iron_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/iron_impure.svg?url")});
      }
    }
    &.node_COPPER {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/copper_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/copper_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/copper_impure.svg?url")});
      }
    }
    &.node_LIMESTONE {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/limestone_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/limestone_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/limestone_impure.svg?url")});
      }
    }
    &.node_BAUXITE {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/bauxite_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/bauxite_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/bauxite_impure.svg?url")});
      }
    }
    &.node_URANIUM {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/uranium_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/uranium_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/uranium_impure.svg?url")});
      }
    }
    &.node_COAL {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/coal_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/coal_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/coal_impure.svg?url")});
      }
    }
    &.node_OIL {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/oil_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/oil_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/oil_impure.svg?url")});
      }
    }
    &.node_SULFUR {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/sulfur_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/sulfur_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/sulfur_impure.svg?url")});
      }
    }
    &.node_QUARTZ {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/quartz_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/quartz_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/quartz_impure.svg?url")});
      }
    }
    &.node_SAM {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/sam_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/sam_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/sam_impure.svg?url")});
      }
    }
    &.node_CATERIUM {
      &.node_PURE {
        background-image: url(${require("../Icons/markers/caterium_pure.svg?url")});
      }
      &.node_NORMAL {
        background-image: url(${require("../Icons/markers/caterium_normal.svg?url")});
      }
      &.node_IMPURE {
        background-image: url(${require("../Icons/markers/caterium_impure.svg?url")});
      }
    }

    &.slug_GREEN {
      background-image: url(${require("../Icons/slugs/green.svg?url")});
    }

    &.slug_YELLOW {
      background-image: url(${require("../Icons/slugs/yellow.svg?url")});
    }

    &.slug_PURPLE {
      background-image: url(${require("../Icons/slugs/purple.svg?url")});
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
