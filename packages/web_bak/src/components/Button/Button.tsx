import { Flex } from "@rebass/grid";
import React from "react";
// import { Icon, IconProps } from "../Icon/Icon";
import { T } from "../T/T";
import {
  ButtonContent,
  ButtonLink,
  ButtonRoot,
  ButtonRootProps
} from "./Button.style";

type ButtonProps = ButtonRootProps & {
  type?: "submit" | "button";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => any;
  label?: string;
  to?: string;
  // iconLeft?: IconProps["name"];
  // iconRight?: IconProps["name"];
};

export const Button: React.FC<ButtonProps> = props => {
  const {
    label,
    children,
    loading,
    disabled,
    // iconLeft,
    // iconRight,
    onClick,
    to,
    ...innerProps
  } = props;

  function handleClick() {
    if (!loading && !disabled && onClick) {
      onClick();
    }
  }

  const Component = to ? ButtonLink : ButtonRoot;

  return (
    <Component
      {...innerProps}
      disabled={disabled}
      onClick={handleClick}
      to={to!}
    >
      <ButtonContent>
        {label && (
          <Flex alignItems="center" justifyContent="center">
            {/* {iconLeft && (
              <Icon
                mr={
                  props.size === "large" ? 16 : props.size === "small" ? 8 : 12
                }
                name={iconLeft}
                size={16}
              />
            )} */}
            <T
              align="center"
              weight="bold"
              type={
                props.size === "large"
                  ? "body"
                  : props.size === "small"
                  ? "note"
                  : "p"
              }
            >
              {label}
            </T>
            {/* {iconRight && (
              <Icon
                ml={
                  props.size === "large" ? 16 : props.size === "small" ? 8 : 12
                }
                name={iconRight}
                size={16}
              />
            )} */}
          </Flex>
        )}
        {label === undefined && children}
      </ButtonContent>
    </Component>
  );
};
