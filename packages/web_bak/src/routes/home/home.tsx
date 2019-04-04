import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

import * as S from "./home.style";
import { InteractiveMap } from "../../modules/InteractiveMap/InteractiveMap";

export const HomeRoute = () => {
  return (
    <S.Root>
      <S.Body>
        <InteractiveMap />
      </S.Body>
    </S.Root>
  );
};
