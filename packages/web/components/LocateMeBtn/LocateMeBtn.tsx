import React from "react";
import { Modal } from "../Modal/Modal";
import { PlayerLocation, getPlayersFromSave } from './getPlayerFromSave';

import * as S from "./LocateMeBtn.style";

type Props = {
  onLocationChange: (pos: PlayerLocation[]) => void;
};

type State = {
  isOpen: boolean;
  currentSave?: File;
};

export class LocateMeBtn extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen, currentSave: undefined });
  }

  handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files.length === 1) {
      this.setState({ currentSave: e.target.files[0] });
    }
  }

  handleSubmit() {
    const { currentSave } = this.state;
    const { onLocationChange } = this.props;

    if (!currentSave) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const loc = await getPlayersFromSave(reader.result!);
        if (loc.length === 0) {
          throw new Error("No players has been found");
        }

        onLocationChange(loc);
        this.setState({ isOpen: false, currentSave: undefined });
      } catch (e) {
        console.log(e);
        // this.setState({ error: true, loadingPlayer: false });
      }
    };
    reader.onerror = console.error;
    reader.readAsArrayBuffer(currentSave);
  }

  render() {
    const { isOpen, currentSave } = this.state;

    return (
      <>
        <S.Button onClick={this.toggleModal}>Locate players</S.Button>
        <Modal
          isOpen={isOpen}
          onRequestClose={this.toggleModal}
          contentLabel="Example Modal"
        >
          <S.ModalBody>
            Please select your gamefile from your computer to display your
            location on the map.
            <p>Satisfactory saves are located here:</p>
            <S.Path>%LOCALAPPDATA%/FactoryGame/Saved/SaveGames/</S.Path>
            <input onChange={this.handleFileUpload} type="file" accept=".sav" />
            <S.Note>
              Note: we do not upload the file over the internet, it stays in
              your browser, even with a lower internet connection this feature
              is available
            </S.Note>
            <S.Buttons>
              <button type="button" onClick={this.toggleModal}>
                Cancel
              </button>
              <button type="button" onClick={this.handleSubmit} disabled={!currentSave}>Locate me!</button>
            </S.Buttons>
          </S.ModalBody>
        </Modal>
      </>
    );
  }
}
