import React from "react";
import { TypographyRoot, TypographyRootProps } from "./T.style";

type TypographyProps = Partial<TypographyRootProps> & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  role?: string;
  tabIndex?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export const T: React.FC<TypographyProps> = React.memo(props => {
  const { children, type = "p", ...rest } = props;

  return (
    <TypographyRoot type={type} {...rest}>
      {props.children}
    </TypographyRoot>
  );
});
