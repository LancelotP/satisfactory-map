import React from "react";
import ReactModal from "react-modal";
import { ModalRoot } from "./Modal.style";
import { Omit } from "react-leaflet";

type ReactModalOmittedProps =
  | "className"
  | "bodyOpenClassName"
  | "htmlOpenClassName"
  | "overlayClassName"
  | "portalClassName";

type ModalProps = Omit<ReactModal.Props, ReactModalOmittedProps> & {};

export const Modal: React.FC<ModalProps> = React.memo(
  ({ style, children, ...props }) => (
    <ModalRoot
      style={{
        maxWidth: 420,
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
