import React from "react";

import * as S from "./LocateMeBtn.style";

type State = {
  isOpen: boolean;
};

export class LocateMeBtn extends React.PureComponent<{}, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;

    return <S.Button onClick={this.toggleModal}>Locate players</S.Button>;
  }
}
