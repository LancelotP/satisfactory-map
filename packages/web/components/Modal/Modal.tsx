import React from "react";
import ReactModal from "react-modal";
import { Omit } from "react-router";
import { ModalRoot } from "./Modal.style";

type ReactModalOmittedProps =
  | "className"
  | "bodyOpenClassName"
  | "htmlOpenClassName"
  | "overlayClassName"
  | "portalClassName";

type ModalProps = Omit<ReactModal.Props, ReactModalOmittedProps> & {};

ReactModal.setAppElement("#__next");

export const Modal: React.FC<ModalProps> = React.memo(
  ({ style, children, ...props }) => (
    <ModalRoot
      style={{
        ...style
      }}
      {...props}
    >
      {children}
    </ModalRoot>
  )
);

Modal.defaultProps = {
  shouldCloseOnEsc: true,
  shouldCloseOnOverlayClick: true,
  closeTimeoutMS: 250
};
