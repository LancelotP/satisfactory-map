import {
  BgColorProps,
  borderRadius,
  BorderRadiusProps,
  space,
  SpaceProps
} from "styled-system";
import styled, { css, ThemeInterface } from "../../themes/styled";

export type TypographyRootProps = SpaceProps &
  BgColorProps &
  BorderRadiusProps & {
    type: keyof typeof types;
    letterSpacing?: string;
    textDecoration?: string;
    align?: string;
    weight?: string;
    opacity?: number;
    transform?:
      | "none"
      | "capitalize"
      | "uppercase"
      | "lowercase"
      | "initial"
      | "inherit";
    color?: keyof ThemeInterface["colors"];
  };

const TypographyBase = css`
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;

  & > a {
    font-family: inherit;
    color: inherit;
  }
`;

const Legend = css`
  html & {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }

  font-size: 80px;
  line-height: 80px;
`;

const Hero = css`
  html & {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }
  font-size: 64px;
  line-height: 80px;
`;

const Heading1 = css`
  html & {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }
  font-size: 40px;
  line-height: 52px;
`;

const Heading2 = css`
  html & {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }
  font-size: 32px;
  line-height: 40px;
`;

const Heading3 = css`
  html & {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }
  font-size: 24px;
  line-height: 36px;
`;

const Heading4 = css`
  html & {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }
  font-size: 20px;
  line-height: 30px;
`;

const Heading5 = css`
  html & {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }
  font-size: 18px;
  line-height: 30px;
`;

const Body = css`
  html & {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }
  font-size: 16px;
  line-height: 24px;
`;

export const Paragraph = css`
  html & {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }
  font-size: 14px;
  line-height: 24px;
`;

export const Note = css`
  html & {
    font-family: "Open Sans", Arial, Helvetica, sans-serif;
  }
  font-size: 12px;
  line-height: 18px;
`;

const types = {
  legend: Legend,
  hero: Hero,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  body: Body,
  p: Paragraph,
  note: Note
};

export const TypographyRoot = styled.p<TypographyRootProps>` 
  transition: color .25s ease;

  color: ${({ theme, color }) => theme.colors[color || "grey900"]};

  ${TypographyBase};
  ${({ type: size }) => types[size]};
  ${({ transform }) => transform && `text-transform: ${transform};`}
  ${({ letterSpacing }) => letterSpacing && `letter-spacing: ${letterSpacing};`}
  ${({ textDecoration }) =>
    textDecoration && `text-decoration: ${textDecoration};`}
  ${({ weight }) => weight && `font-weight: ${weight};`}
  ${({ align }) => align && `text-align: ${align};`}
  ${({ opacity }) => opacity && `opacity: ${opacity};`}
  ${space}
  ${borderRadius}

  & > em {
    text-decoration: none;
    font-style: normal;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary500};
  }
`;
