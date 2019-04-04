import React from "react";
import { storiesOf } from "@storybook/react";
import { radios } from "@storybook/addon-knobs";
import Button, { ButtonProps } from "./Button";

const shape = radios(
  "shape",
  {
    Block: "block",
    Stroke: "stroke",
    Ghost: "ghost"
  },
  "block"
);

const size = radios<ButtonProps["size"]>(
  "size",
  {
    Small: "small",
    Medium: "medium",
    Large: "large"
  },
  "small"
) as ButtonProps["size"];

storiesOf("Button", module)
  .add("with text", () => (
    <div>
      <Button size={size}>Hello Button</Button>
      <Button color="white" size={size}>
        Hello Button
      </Button>
    </div>
  ))
  .add("with emoji", () => <Button size={size}>😀 😎 👍 💯</Button>);
