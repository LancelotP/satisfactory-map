import { Flex } from "@rebass/grid";
import { Link } from "react-router-dom";
import { space, SpaceProps } from "styled-system";
// import { IconRoot } from "../Icon/Icon";
import { TypographyRoot } from "../T/T.style";
import styled, { css } from "../../themes/styled";

const ButtonBlockDisabled = css`
  border-color: ${({ theme }) => theme.colors.grey300};
  background-color: ${({ theme }) => theme.colors.grey300};
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonStrokeDisabled = css`
  border-color: ${({ theme }) => theme.colors.grey300};
  background-color: ${({ theme }) => theme.colors.grey300};
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonBlockPrimary = css`
  border-color: ${({ theme }) => theme.colors.primary500};
  background-color: ${({ theme }) => theme.colors.primary500};
  color: ${({ theme }) => theme.colors.white};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary700};
    background-color: ${({ theme }) => theme.colors.primary700};
  }

  &:active {
    border-color: ${({ theme }) => theme.colors.primary900};
    background-color: ${({ theme }) => theme.colors.primary900};
  }
`;

const ButtonStrokePrimary = css`
  border-color: ${({ theme }) => theme.colors.primary500};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.grey900};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary700};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    border-color: ${({ theme }) => theme.colors.primary900};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const ButtonBlockSecondary = css`
  border-color: ${({ theme }) => theme.colors.primary900};
  background-color: ${({ theme }) => theme.colors.primary900};
  color: ${({ theme }) => theme.colors.white};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary300};
    background-color: ${({ theme }) => theme.colors.secondary300};
  }

  &:active {
    border-color: ${({ theme }) => theme.colors.secondary300};
    background-color: ${({ theme }) => theme.colors.secondary300};
  }
`;

const ButtonStrokeSecondary = css`
  border-color: ${({ theme }) => theme.colors.primary900};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.grey900};

  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.colors.secondary300};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    border-color: ${({ theme }) => theme.colors.secondary300};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const ButtonSizeSmall = css`
  padding: 6px 16px;
`;

const ButtonSizeMedium = css`
  padding: 7px 16px;
`;

const ButtonSizeLarge = css`
  padding: 13px 24px;
`;

const ButtonStatusLoading = css`
  cursor: progress;
`;

const ButtonStatusLoaded = css`
  cursor: default;
`;

const ButtonStatusDisabled = css`
  cursor: not-allowed;
`;

// & > ${Flex} > ${IconRoot} {
//   flex: 0 0 auto;
// }
export const ButtonContent = styled.div`
  transition: opacity 250ms ease;

  & ${TypographyRoot}, & > ${Flex} svg {
    color: inherit;
  }
`;

const shapes = {
  // ghost: ButtonShapeGhost,
  stroke: {
    disabled: ButtonStrokeDisabled,
    primary: ButtonStrokePrimary,
    secondary: ButtonStrokeSecondary
    //   success: ButtonStrokeSuccess,
    //   danger: ButtonStrokeDanger,
    //   warning: ButtonStrokeWarning
  },
  block: {
    disabled: ButtonBlockDisabled,
    primary: ButtonBlockPrimary,
    secondary: ButtonBlockSecondary
    // success: ButtonBlockSuccess,
    // danger: ButtonBlockDanger,
    // warning: ButtonBlockWarning
  }
};

const sizes = {
  small: ButtonSizeSmall,
  medium: ButtonSizeMedium,
  large: ButtonSizeLarge
};

const statuses = {
  loading: ButtonStatusLoading,
  loaded: ButtonStatusLoaded,
  disabled: ButtonStatusDisabled
};

export type ButtonRootProps = SpaceProps & {
  color?: "secondary" | "primary";
  size?: keyof typeof sizes;
  shape?: keyof typeof shapes;
  fluid?: boolean;
  loading?: boolean;
  loaded?: boolean;
};

export const ButtonRoot = styled.button<ButtonRootProps>`
  display: block;

  transition:
    color 250ms ease,
    background-color 250ms ease,
    border 250ms ease
  ;
  
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
  outline: none;
  cursor: pointer;
  width: ${({ fluid }) => (fluid ? "100%" : "auto")};

  & ${ButtonContent} {
  ${({ loading, loaded }) => {
    if (loading || loaded) {
      return "opacity: 0";
    }
    return "opacity: 1";
  }}
  }

  ${({ shape, disabled, color }) => {
    const buttons = shapes[shape || "block"];

    if (disabled) {
      return buttons.disabled;
    } else {
      return buttons[color || "primary"];
    }
  }}

  ${({ size }) => sizes[size || "medium"]}
  ${({ loading }) => loading && statuses.loading}
  ${({ loaded }) => loaded && statuses.loaded}
  ${({ disabled }) => disabled && statuses.disabled}
  ${space}
`;

export const ButtonLink = ButtonRoot.withComponent(Link);
