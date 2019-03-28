import React, { ChangeEvent } from "react";

import * as S from "./Menu.style";
import { T } from "../../../T/T";
import { DepositType, SlugType } from "../../../../__generated__";
import { Box, Flex } from "@rebass/grid";

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
  selection: FilterSelection;
  onChange: (selection: FilterSelection) => void;
  isOpen: boolean;
  // selection: MarkerSelection;
};

export type FilterSelection = {
  deposits: { [k in DepositType]: boolean };
  slugs: { [k in SlugType]: boolean };
};

export const Menu = (props: Props) => {
  const { selection, onChange, isOpen } = props;

  const depositSelected = Object.keys(selection.deposits).some(
    key => selection.deposits[key as DepositType]
  );
  const slugSelected = Object.keys(selection.slugs).some(
    key => selection.slugs[key as SlugType]
  );

  function handleItemChange(
    group: "slugs",
    key: SlugType
  ): (e: ChangeEvent<HTMLInputElement>) => void;
  function handleItemChange(
    group: "deposits",
    key: DepositType
  ): (e: ChangeEvent<HTMLInputElement>) => void;
  function handleItemChange(
    group: "deposits" | "slugs",
    key: SlugType | DepositType
  ) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...selection,
        [group]: {
          ...selection[group],
          [key]: e.target.checked
        }
      });
    };
  }

  function handleGroupChange(group: "deposits" | "slugs") {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const newGroup = Object.assign({}, selection[group]);

      Object.keys(newGroup).map(key => {
        // @ts-ignore
        newGroup[key] = e.target.checked;
      });

      onChange({
        ...selection,
        [group]: newGroup
      });
    };
  }

  return (
    <S.Root isOpen={isOpen}>
      <S.Header>
        <S.Logo src={require("./logo.png")} />
      </S.Header>
      <S.Body>
        <ul>
          <li>
            <Flex alignItems="center" as="label">
              <input
                onChange={handleGroupChange("deposits")}
                checked={depositSelected}
                type="checkbox"
              />
              <T type="body" ml={2}>
                Deposits
              </T>
            </Flex>
            <ul>
              {Object.keys(DepositType).map(key => (
                <li key={key}>
                  <Flex alignItems="center" as="label">
                    <input
                      onChange={handleItemChange(
                        "deposits",
                        DepositType[key as keyof typeof DepositType]
                      )}
                      checked={
                        selection.deposits[
                          DepositType[key as keyof typeof DepositType]
                        ]
                      }
                      type="checkbox"
                    />
                    <T ml={2}>{key}</T>
                  </Flex>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Flex alignItems="center" as="label">
              <input
                onChange={handleGroupChange("slugs")}
                checked={slugSelected}
                type="checkbox"
              />
              <T type="body" ml={2}>
                Slugs
              </T>
            </Flex>
            <ul>
              {Object.keys(SlugType).map(key => (
                <li key={key}>
                  <Flex alignItems="center" as="label">
                    <input
                      onChange={handleItemChange(
                        "slugs",
                        SlugType[key as keyof typeof SlugType]
                      )}
                      checked={
                        selection.slugs[SlugType[key as keyof typeof SlugType]]
                      }
                      type="checkbox"
                    />
                    <T ml={2}>{key}</T>
                  </Flex>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </S.Body>
      <S.Footer>Footer</S.Footer>
    </S.Root>
  );
};
