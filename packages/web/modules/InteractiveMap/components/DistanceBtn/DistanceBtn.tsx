import React from "react";
import * as S from "./DistanceBtn.style";

type Props = {
  prepareDistanceCalc: (d: any) => void;
};

export class DistanceBtn extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive(e) {
    const { prepareDistanceCalc } = this.props;
    prepareDistanceCalc(e);
  }

  render() {
    return (
      <>
        <S.Button onClick={this.toggleActive}>Measure distance</S.Button>
      </>
    );
  }
}
