import { memo, ReactNode } from "react";
import { Popup as LPopup } from "react-leaflet";
import * as S from "./Popup.style";

type Props = {
  children: ReactNode;
};

export const Popup = memo<Props>(props => {
  const { children } = props;

  return (
    <LPopup>
      <S.Root>{children}</S.Root>
    </LPopup>
  );
});
