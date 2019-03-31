import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import * as S from "./Layout.style";

type Props = {
  children: React.ReactElement;
};

export const Layout = (props: Props) => {
  return (
    <S.Root>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Satisfactory Map
          </Typography>
        </Toolbar>
      </AppBar>
      <S.Content>{props.children}</S.Content>
    </S.Root>
  );
};
