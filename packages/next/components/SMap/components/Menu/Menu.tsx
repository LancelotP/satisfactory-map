import * as S from "./Menu.style";
import get from "lodash.get";
import set from "lodash.set";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { MarkerSelection } from "../../utils/getDefaultSelection";
import { ChangeEvent } from "react";

type Props = {
  selection: MarkerSelection;
  onSelectionChange: (s: MarkerSelection) => void;
};

export const Menu = (props: Props) => {
  const { selection, onSelectionChange } = props;

  const handleSelectionChange = (key: string) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const selectionCopy = Object.assign({}, selection);
    set(selection, key, e.target.checked);
    onSelectionChange(selectionCopy);
  };

  const handleToggleAll = (val: boolean) => {
    return () =>
      onSelectionChange({
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
          geysers: val,
          sulfur: val,
          bauxite: val,
          quartz: val,
          uranium: val,
          sam: val
        },
        geysers: val,
        dropPods: val,
        unknowns: val
      });
  };

  return (
    <S.Root>
      <S.LogoWrapper>
        <img src="/static/logo.png" alt="Satisfactory map logo" />
      </S.LogoWrapper>
      <S.Content>
        <S.SliderWrapper>
          <p>Icon size</p>
          <Slider min={30} max={60} step={10} />
        </S.SliderWrapper>
        <S.SliderWrapper>
          <p>Cluster size</p>
          <Slider min={30} max={60} step={10} />
        </S.SliderWrapper>
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
          <S.ToggleWrapper>
            <h3>Quality</h3>
            <input type="checkbox" />
          </S.ToggleWrapper>
          <S.ExpandContent>
            <S.ToggleWrapper>
              <h3>Impure</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("quality.impure")}
                checked={selection.quality.impure}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Normal</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("quality.normal")}
                checked={selection.quality.normal}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Pure</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("quality.pure")}
                checked={selection.quality.pure}
              />
            </S.ToggleWrapper>
          </S.ExpandContent>
        </S.Expand>
        <S.Expand>
          <S.ToggleWrapper>
            <h3>Nodes</h3>
            <input type="checkbox" />
          </S.ToggleWrapper>
          <S.ExpandContent>
            <S.ToggleWrapper>
              <h3>Iron</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.iron")}
                checked={selection.nodes.iron}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Copper</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.copper")}
                checked={selection.nodes.copper}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Limestone</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.limestone")}
                checked={selection.nodes.limestone}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Coal</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.coal")}
                checked={selection.nodes.coal}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Oil</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.oil")}
                checked={selection.nodes.oil}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Caterium</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.caterium")}
                checked={selection.nodes.caterium}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Geysers</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.geysers")}
                checked={selection.nodes.geysers}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Sulfur</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.sulfur")}
                checked={selection.nodes.sulfur}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Bauxite</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.bauxite")}
                checked={selection.nodes.bauxite}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Quartz</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.quartz")}
                checked={selection.nodes.quartz}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>Uranium</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.uranium")}
                checked={selection.nodes.uranium}
              />
            </S.ToggleWrapper>
            <S.ToggleWrapper>
              <h3>S.A.M</h3>
              <input
                type="checkbox"
                onChange={handleSelectionChange("nodes.sam")}
                checked={selection.nodes.sam}
              />
            </S.ToggleWrapper>
          </S.ExpandContent>
        </S.Expand>
        <S.ToggleWrapper>
          <h3>Slugs</h3>
          <input type="checkbox" />
        </S.ToggleWrapper>
        <S.ExpandContent>
          <S.ToggleWrapper>
            <h3>Green</h3>
            <input
              type="checkbox"
              onChange={handleSelectionChange("slugs.green")}
              checked={selection.slugs.green}
            />
          </S.ToggleWrapper>
          <S.ToggleWrapper>
            <h3>Yellow</h3>
            <input
              type="checkbox"
              onChange={handleSelectionChange("slugs.yellow")}
              checked={selection.slugs.yellow}
            />
          </S.ToggleWrapper>
          <S.ToggleWrapper>
            <h3>Purple</h3>
            <input
              type="checkbox"
              onChange={handleSelectionChange("slugs.purple")}
              checked={selection.slugs.purple}
            />
          </S.ToggleWrapper>
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
