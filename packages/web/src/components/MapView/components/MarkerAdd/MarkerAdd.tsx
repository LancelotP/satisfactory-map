import React, { useState, ChangeEvent } from "react";
import { Modal } from "../../../Modal/Modal";
import { useViewer } from "../../../../routes/routes";
import { T } from "../../../T/T";
import { Button } from "../../../Button/Button";
import { login } from "../../../../services/auth";
import { Flex, Box } from "@rebass/grid";
import {
  DepositType,
  DepositQuality,
  useDepositCreate,
  MapViewDocument,
  MapViewQuery
} from "../../../../__generated__";

type Props = {
  position: undefined | L.LatLng;
  onClose: () => void;
};

export const MarkerAdd = (props: Props) => {
  const { position, onClose } = props;
  const viewer = useViewer();

  const [quality, setQuality] = useState<DepositQuality | undefined>(undefined);
  const [type, setType] = useState<DepositType | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const depositCreate = useDepositCreate();

  function handleQualityChange(e: ChangeEvent<HTMLSelectElement>) {
    setQuality(e.target.value as DepositQuality);
  }

  function handleTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    setType(e.target.value as DepositType);
  }

  async function handleSubmit() {
    setLoading(true);

    try {
      await depositCreate({
        variables: {
          input: {
            lat: parseInt(position!.lat.toFixed(), 10),
            lng: parseInt(position!.lng.toFixed(), 10),
            type,
            quality
          }
        },
        update: (proxy, mutationResult) => {
          const mapQuery = proxy.readQuery<MapViewQuery>({
            query: MapViewDocument
          });

          if (mapQuery && mutationResult.data) {
            mapQuery.defaultMap.markers.edges.push({
              __typename: "MapMarkerEdge",
              node: mutationResult.data.depositCreate
            });

            proxy.writeQuery({
              query: MapViewDocument,
              data: mapQuery
            });
          }
        }
      });
      setQuality(undefined);
      setType(undefined);
      setLoading(false);
      onClose();
    } catch (e) {
      console.error(e);
      console.log(JSON.stringify(e, null, 2));
      // location.reload();
    }
  }

  return (
    <Modal
      onRequestClose={onClose}
      closeTimeoutMS={250}
      isOpen={position !== undefined}
    >
      {viewer === null && (
        <React.Fragment>
          <T>You must be logged in in order to add a marker</T>
          <Button mx="auto" mt={2} label="Login" onClick={login} />
        </React.Fragment>
      )}
      {viewer !== null && (
        <Flex flexDirection="column">
          <Box>
            <select defaultValue="deposit" disabled={true}>
              <option value="deposit">deposit</option>
            </select>
          </Box>
          <Box>
            <select defaultValue="" onChange={handleTypeChange}>
              <option value="" disabled={true}>
                select a type
              </option>
              <option value={DepositType.Iron}>Iron</option>
              <option value={DepositType.Copper}>Copper</option>
              <option value={DepositType.Limestone}>Limestone</option>
              <option value={DepositType.Coal}>Coal</option>
              <option value={DepositType.Oil}>Oil</option>
              <option value={DepositType.Sulphur}>Sulphur</option>
              <option value={DepositType.Caterium}>Caterium</option>
              <option value={DepositType.Sam}>Sam</option>
              <option value={DepositType.Quartz}>Quartz</option>
              <option value={DepositType.Beauxite}>Beauxite</option>
              <option value={DepositType.Uranium}>Uranium</option>
            </select>
          </Box>
          <Box>
            <select defaultValue="" onChange={handleQualityChange}>
              <option value="" disabled={true}>
                select a quality
              </option>
              <option value={DepositQuality.Pure}>Pure</option>
              <option value={DepositQuality.Normal}>Normal</option>
              <option value={DepositQuality.Impure}>Impure</option>
            </select>
          </Box>
          <Button
            onClick={handleSubmit}
            label="add"
            loading={loading}
            disabled={!quality || !type}
          />
        </Flex>
      )}
    </Modal>
  );
};
