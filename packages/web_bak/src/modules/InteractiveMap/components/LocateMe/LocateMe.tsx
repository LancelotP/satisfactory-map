import React, { useState, ChangeEvent } from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
  Input,
  Typography
} from "@material-ui/core";
import {
  getPlayersFromSave,
  PlayerLocation
} from "../../../../utils/getPlayersFromSave";

type Props = {
  onPositionsLoaded: (positions: PlayerLocation[]) => any;
};

export const LocateMe = (props: Props) => {
  const { onPositionsLoaded } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "error" | undefined>(
    undefined
  );
  const [currentSave, setCurrentSave] = useState<File | undefined>(undefined);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length !== 1) {
      return;
    }

    setCurrentSave(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setStatus("loading");
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const loc = await getPlayersFromSave(reader.result!);
        if (loc.length === 0) {
          throw new Error("No players has been found");
        }
        onPositionsLoaded(loc);
        setIsOpen(false);
      } catch (e) {
        console.log(e);
        setStatus("error");
      }
    };
    reader.onerror = console.error;
    reader.readAsArrayBuffer(currentSave!);
  };

  return (
    <React.Fragment>
      <Button variant="contained" color="secondary" onClick={handleToggle}>
        Locate me
      </Button>
      <Dialog open={isOpen} onClose={handleToggle}>
        <DialogTitle>Find player location</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload your save file to display markers of all the players in it on
            the map.
          </DialogContentText>
          <br />
          <DialogContentText>
            Default path is:
            <br />
            <code>%appdata%..\Local\FactoryGame\Saved\SaveGames\</code>
            <br />
            <br />
            <Input
              inputProps={{ accept: ".sav" }}
              onChange={handleFileUpload}
              type="file"
            />
          </DialogContentText>
        </DialogContent>
        {status === "error" && (
          <DialogContent>
            <Typography color="error">Something went wrong</Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleToggle} color="primary">
            Cancel
          </Button>
          <Button
            disabled={!currentSave}
            onClick={handleSubmit}
            color="primary"
          >
            Locate me
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
