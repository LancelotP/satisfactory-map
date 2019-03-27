import React, { ChangeEvent } from "react";

import * as S from "./Menu.style";
import { T } from "../../../T/T";

export type MarkerSelection = {
  iron: boolean;
  copper: boolean;
  limestone: boolean;
  coal: boolean;
  oil: boolean;
  sulphur: boolean;
  caterium: boolean;
  sam: boolean;
  quartz: boolean;
  beauxite: boolean;
  uranium: boolean;
};

type Props = {
  onChange: (selection: MarkerSelection) => void;
  selection: MarkerSelection;
};

export const Menu = (props: Props) => {
  const { onChange, selection } = props;

  function handleChange(field: keyof MarkerSelection) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...selection,
        [field]: e.target.checked
      });
    };
  }

  return (
    <S.Root>
      <S.Menu>
        <S.Btn>
          <T>Ores</T>
        </S.Btn>
        <S.Content>
          <ul>
            <li>
              <label>
                <input
                  checked={selection.iron}
                  onChange={handleChange("iron")}
                  type="checkbox"
                />
                <T>Iron</T>
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={selection.copper}
                  onChange={handleChange("copper")}
                  type="checkbox"
                />
                <T>Copper</T>
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={selection.limestone}
                  onChange={handleChange("limestone")}
                  type="checkbox"
                />
                <T>Limestone</T>
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={selection.coal}
                  onChange={handleChange("coal")}
                  type="checkbox"
                />
                <T>Coal</T>
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={selection.oil}
                  onChange={handleChange("oil")}
                  type="checkbox"
                />
                <T>Oil</T>
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={selection.sulphur}
                  onChange={handleChange("sulphur")}
                  type="checkbox"
                />
                <T>Sulphur</T>
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={selection.caterium}
                  onChange={handleChange("caterium")}
                  type="checkbox"
                />
                <T>Caterium</T>
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={selection.sam}
                  onChange={handleChange("sam")}
                  type="checkbox"
                />
                <T>Sam</T>
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={selection.quartz}
                  onChange={handleChange("quartz")}
                  type="checkbox"
                />
                <T>Quartz</T>
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={selection.beauxite}
                  onChange={handleChange("beauxite")}
                  type="checkbox"
                />
                <T>Beauxite</T>
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={selection.uranium}
                  onChange={handleChange("uranium")}
                  type="checkbox"
                />
                <T>Uranium</T>
              </label>
            </li>
          </ul>
        </S.Content>
      </S.Menu>
    </S.Root>
  );
};
