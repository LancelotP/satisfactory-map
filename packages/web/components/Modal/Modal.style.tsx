import { transparentize } from "polished";
import React from "react";
import ReactModal from "react-modal";
import styled, { css } from "../../themes/styled";

const ModalStyle = css`
  &__html,
  &__body {
    overflow: hidden;
  }

  &__overlay {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 10000;
    background-color: ${({ theme }) => transparentize(0.15, "#000")};

    opacity: 0;
    transition: opacity 0.25s ease;

    display: flex;
    align-items: center;
    justify-content: center;

    &__opened {
      opacity: 1;
    }

    &__closing {
      opacity: 0;
    }

    padding: 64px;
  }

  &__content {
    outline: none;
    padding: 24px 40px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 2px;

    transition: transform 0.25s ease, opacity 0.25s ease;
    transform: translateY(100px);
    opacity: 0;

    &__opened {
      transform: translateY(0);
      opacity: 1;
    }

    &__closing {
      transform: translateY(100px);
      opacity: 0;
    }
  }
`;

export const ModalRoot = styled(({ className, ...props }) => (
  <ReactModal
    className={{
      afterOpen: `${className}__content__opened`,
      beforeClose: `${className}__content__closing`,
      base: `${className}__content`
    }}
    bodyOpenClassName={`${className}__body`}
    htmlOpenClassName={`${className}__html`}
    overlayClassName={{
      base: `${className}__overlay`,
      afterOpen: `${className}__overlay__opened`,
      beforeClose: `${className}__overlay__closing`
    }}
    portalClassName={`${className}__portal`}
    {...props}
    style={{
      content: props.style
    }}
  />
))`
  ${ModalStyle}
`;
