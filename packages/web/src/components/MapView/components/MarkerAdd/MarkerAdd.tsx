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
  MapViewDocument,
  MapViewQuery,
  useMarkerCreate,
  MarkerType,
  SlugType
} from "../../../../__generated__";

type Props = {
  position: undefined | L.LatLng;
  onClose: () => void;
  type: MarkerType;
};

export const MarkerAdd = (props: Props) => {
  const { position, onClose, type } = props;
  const viewer = useViewer();

  const [depositQuality, setDepositQuality] = useState<
    DepositQuality | undefined
  >(undefined);
  const [depositType, setDepositType] = useState<DepositType | undefined>(
    undefined
  );
  const [slugType, setSlugType] = useState<SlugType | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const markerCreate = useMarkerCreate();

  function handleDepositQualityChange(e: ChangeEvent<HTMLSelectElement>) {
    setDepositQuality(e.target.value as DepositQuality);
  }

  function handleDepositTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    setDepositType(e.target.value as DepositType);
  }

  function handleSlugTypeChange(e: ChangeEvent<HTMLSelectElement>) {
    setSlugType(e.target.value as SlugType);
  }

  async function handleSubmit() {
    setLoading(true);

    try {
      await markerCreate({
        variables: {
          input: {
            lat: parseInt(position!.lat.toFixed(), 10),
            lng: parseInt(position!.lng.toFixed(), 10),
            type,
            deposit:
              type === MarkerType.Deposit
                ? {
                    type: depositType!,
                    quality: depositQuality!
                  }
                : undefined,
            slug:
              type === MarkerType.Slug
                ? {
                    type: slugType!
                  }
                : undefined
          }
        },
        update: (proxy, mutationResult) => {
          const mapQuery = proxy.readQuery<MapViewQuery>({
            query: MapViewDocument
          });

          if (mapQuery && mutationResult.data) {
            mapQuery.defaultMap.markers.edges.push({
              __typename: "MapMarkerEdge",
              node: mutationResult.data.markerCreate
            });

            proxy.writeQuery({
              query: MapViewDocument,
              data: mapQuery
            });
          }
        }
      });
      setDepositQuality(undefined);
      setDepositType(undefined);
      setSlugType(undefined);
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
          <T mb={3} align="center" type="h3">
            {type === MarkerType.Deposit && "Add deposit marker"}
            {type === MarkerType.Slug && "Add slug marker"}
          </T>
          {type === MarkerType.Deposit && (
            <React.Fragment>
              <Box>
                <select
                  style={{ width: "100%" }}
                  defaultValue=""
                  onChange={handleDepositTypeChange}
                >
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
              <Box mt={2}>
                <select
                  style={{ width: "100%" }}
                  defaultValue=""
                  onChange={handleDepositQualityChange}
                >
                  <option value="" disabled={true}>
                    select a quality
                  </option>
                  <option value={DepositQuality.Pure}>Pure</option>
                  <option value={DepositQuality.Normal}>Normal</option>
                  <option value={DepositQuality.Impure}>Impure</option>
                </select>
              </Box>
              <Button
                mt={3}
                onClick={handleSubmit}
                label="Create marker"
                loading={loading}
                disabled={!depositQuality || !depositType}
              />
            </React.Fragment>
          )}
          {type === MarkerType.Slug && (
            <React.Fragment>
              <Box>
                <select
                  style={{ width: "100%" }}
                  defaultValue=""
                  onChange={handleSlugTypeChange}
                >
                  <option value="" disabled={true}>
                    select a type
                  </option>
                  <option value={SlugType.Green}>Green</option>
                  <option value={SlugType.Yellow}>Yellow</option>
                  <option value={SlugType.Purple}>Purple</option>
                </select>
              </Box>
              <Button
                mt={3}
                onClick={handleSubmit}
                label="Create marker"
                loading={loading}
                disabled={!slugType}
              />
            </React.Fragment>
          )}
        </Flex>
      )}
    </Modal>
  );
};
