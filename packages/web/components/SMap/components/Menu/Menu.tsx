import * as S from "./Menu.style";
import get from "lodash.get";
import set from "lodash.set";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { MarkerSelection } from "../../utils/getDefaultSelection";
import Head from "next/head";

type Props = {
  selection: MarkerSelection;
  onSelectionChange: (s: MarkerSelection, qualityChange: boolean) => void;
  iconSize: number;
  onIconSizeChange: (v: number) => void;
  onLocateMeClick: () => void;
  // clusterSize: number;
  // onClusterSizeChange: (v: number) => void;
};

export const Menu = (props: Props) => {
  const {
    selection,
    onSelectionChange,
    iconSize,
    onIconSizeChange,
    onLocateMeClick
    // clusterSize,
    // onClusterSizeChange
  } = props;

  function handleSelectionChange(key: string) {
    return () => {
      const selectionCopy = Object.assign({}, selection);
      set(selectionCopy, key, !get(selectionCopy, key));
      onSelectionChange(selectionCopy, key.indexOf("quality") !== -1);
    };
  }

  const handleToggleQuality = (val: boolean) => () =>
    onSelectionChange(
      {
        ...selection,
        quality: {
          impure: val,
          normal: val,
          pure: val
        }
      },
      true
    );

  const handleToggleNodes = (val: boolean) => () =>
    onSelectionChange(
      {
        ...selection,
        nodes: {
          iron: val,
          copper: val,
          limestone: val,
          coal: val,
          oil: val,
          caterium: val,
          sulfur: val,
          bauxite: val,
          quartz: val,
          uranium: val,
          sam: val
        }
      },
      false
    );

  const handleToggleSlugs = (val: boolean) => () =>
    onSelectionChange(
      {
        ...selection,
        slugs: {
          green: val,
          yellow: val,
          purple: val
        }
      },
      false
    );

  const handleToggleAll = (val: boolean) => {
    return () =>
      onSelectionChange(
        {
          quality: {
            impure: val,
            normal: val,
            pure: val
          },
          slugs: {
            green: val,
            yellow: val,
            purple: val
          },
          nodes: {
            iron: val,
            copper: val,
            limestone: val,
            coal: val,
            oil: val,
            caterium: val,
            sulfur: val,
            bauxite: val,
            quartz: val,
            uranium: val,
            sam: val
          },
          geysers: val,
          dropPods: val,
          unknowns: val
        },
        true
      );
  };

  return (
    <S.Root>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Orbitron"
          rel="stylesheet"
        />
      </Head>
      <S.LogoWrapper>
        <img src="/static/logo.png" alt="Satisfactory map logo" />
      </S.LogoWrapper>
      <S.LocateMeBtnWrapper>
        <S.LocateMeBtn onClick={onLocateMeClick}>Locate me</S.LocateMeBtn>
      </S.LocateMeBtnWrapper>
      <S.Content>
        <S.SliderWrapper>
          <p>Icon size</p>
          <Slider
            min={30}
            max={60}
            step={10}
            value={iconSize}
            onChange={onIconSizeChange}
          />
        </S.SliderWrapper>
        {/* <S.SliderWrapper>
          <p>Cluster size</p>
          <Slider
            min={0}
            max={600}
            defaultValue={clusterSize}
            onAfterChange={onClusterSizeChange}
          />
        </S.SliderWrapper> */}
        <S.ToggleWrapper as="div">
          <p>Select</p>
          <div>
            <button name="all" onClick={handleToggleAll(true)}>
              All
            </button>
            &nbsp; &nbsp;
            <button name="none" onClick={handleToggleAll(false)}>
              None
            </button>
          </div>
        </S.ToggleWrapper>
        <S.Expand>
          <S.ToggleWrapper as="div">
            <h3>Quality</h3>
            <div>
              <button name="all" onClick={handleToggleQuality(true)}>
                All
              </button>
              &nbsp; &nbsp;
              <button name="none" onClick={handleToggleQuality(false)}>
                None
              </button>
            </div>
          </S.ToggleWrapper>
          <S.ExpandContent>
            {[
              { key: "impure", name: "Impure" },
              { key: "normal", name: "Normal" },
              { key: "pure", name: "Pure" }
            ].map(({ key, name }) => (
              <S.ToggleWrapper key={key}>
                <h3>{name}</h3>
                <input
                  type="checkbox"
                  onChange={handleSelectionChange(`quality.${key}`)}
                  checked={
                    selection.quality[key as keyof typeof selection.quality]
                  }
                />
              </S.ToggleWrapper>
            ))}
          </S.ExpandContent>
        </S.Expand>
        <S.Expand>
          <S.ToggleWrapper as="div">
            <h3>Nodes</h3>
            <div>
              <button name="all" onClick={handleToggleNodes(true)}>
                All
              </button>
              &nbsp; &nbsp;
              <button name="none" onClick={handleToggleNodes(false)}>
                None
              </button>
            </div>
          </S.ToggleWrapper>
          <S.ExpandContent>
            {[
              { key: "iron", name: "Iron" },
              { key: "copper", name: "Copper" },
              { key: "limestone", name: "Limestone" },
              { key: "coal", name: "Coal" },
              { key: "oil", name: "Oil" },
              { key: "caterium", name: "Caterium" },
              { key: "sulfur", name: "Sulfur" },
              { key: "bauxite", name: "Bauxite" },
              { key: "quartz", name: "Quartz" },
              { key: "uranium", name: "Uranium" },
              { key: "sam", name: "S.A.M" }
            ].map(({ key, name }) => (
              <S.ToggleWrapper key={key}>
                <h3>{name}</h3>
                <input
                  type="checkbox"
                  onChange={handleSelectionChange(`nodes.${key}`)}
                  checked={selection.nodes[key as keyof typeof selection.nodes]}
                />
              </S.ToggleWrapper>
            ))}
          </S.ExpandContent>
        </S.Expand>
        <S.ToggleWrapper as="div">
          <h3>Slugs</h3>
          <div>
            <button name="all" onClick={handleToggleSlugs(true)}>
              All
            </button>
            &nbsp; &nbsp;
            <button name="none" onClick={handleToggleSlugs(false)}>
              None
            </button>
          </div>
        </S.ToggleWrapper>
        <S.ExpandContent>
          {[
            { key: "green", name: "Green" },
            { key: "yellow", name: "Yellow" },
            { key: "purple", name: "Purple" }
          ].map(({ key, name }) => (
            <S.ToggleWrapper key={key}>
              <h3>{name}</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange(`slugs.${key}`)}
                checked={selection.slugs[key as keyof typeof selection.slugs]}
              />
            </S.ToggleWrapper>
          ))}
        </S.ExpandContent>
        <S.ToggleWrapper>
          <h3>Geysers</h3>
          <input
            type="checkbox"
            onChange={handleSelectionChange("geysers")}
            checked={selection.geysers}
          />
        </S.ToggleWrapper>
        <S.ToggleWrapper>
          <h3>DropPods</h3>
          <input
            type="checkbox"
            onChange={handleSelectionChange("dropPods")}
            checked={selection.dropPods}
          />
        </S.ToggleWrapper>
        <S.ToggleWrapper>
          <h3>Unknown</h3>
          <input
            type="checkbox"
            onChange={handleSelectionChange("unknowns")}
            checked={selection.unknowns}
          />
        </S.ToggleWrapper>
      </S.Content>
    </S.Root>
  );
};
