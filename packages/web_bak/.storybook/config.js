import { configure, addDecorator } from "@storybook/react";
import { withPropsTable } from "storybook-addon-react-docgen";
import { withA11y } from "@storybook/addon-a11y";
import { withKnobs } from "@storybook/addon-knobs";

function loadStories() {
  const req = require.context("../src", true, /\.story\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

addDecorator(withPropsTable);
addDecorator(withA11y);
addDecorator(withKnobs);
