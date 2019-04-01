import React, { useState } from "react";

import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import { MarkerSelection } from "../../../../utils/getDefaultMarkerSelection";
import {
  ResourceNodeType,
  SlugType,
  ResourceNodeQuality
} from "../../../../__generated__";
import { getDepositColor } from "../../../../utils/getDepositColor";
import { getSlugColor } from "../../../../utils/getSlugColor";
import { PartialDeep } from "lodash";

type InteractiveMapMenuTopLevel =
  | "nodes"
  | "slugs"
  | "dropPods"
  | "deposits"
  | "creatures";

type Props = {
  selection: MarkerSelection;
  onSelectionChange: (s: MarkerSelection) => void;
};

export const InteractiveMapMenu = (props: Props) => {
  const { selection, onSelectionChange } = props;
  const [openedMenus, setOpenedMenus] = useState({
    nodes: true,
    slugs: false,
    dropPods: false,
    deposits: false,
    creatures: false
  });

  const nodeQualityMenus: Array<{ name: string; key: ResourceNodeQuality }> = [
    { name: "Pure", key: ResourceNodeQuality.Pure },
    { name: "Normal", key: ResourceNodeQuality.Normal },
    { name: "Impure", key: ResourceNodeQuality.Impure }
  ];

  const nodeMenus: Array<{ name: string; key: ResourceNodeType }> = [
    { name: "Iron", key: ResourceNodeType.Iron },
    { name: "Copper", key: ResourceNodeType.Copper },
    { name: "Limestone", key: ResourceNodeType.Limestone },
    { name: "Bauxite", key: ResourceNodeType.Bauxite },
    { name: "Caterium", key: ResourceNodeType.Caterium },
    { name: "Coal", key: ResourceNodeType.Coal },
    { name: "Oil", key: ResourceNodeType.Oil },
    { name: "Quartz", key: ResourceNodeType.Quartz },
    { name: "Sam", key: ResourceNodeType.Sam },
    { name: "Sulfur", key: ResourceNodeType.Sulfur },
    { name: "Uranium", key: ResourceNodeType.Uranium },
    { name: "Geysers", key: ResourceNodeType.Geyser },
    { name: "Unknown", key: ResourceNodeType.Unknown }
  ];

  const slugMenus: Array<{ name: string; key: SlugType }> = [
    { name: "Green Slugs", key: SlugType.Green },
    { name: "Yellow Slugs", key: SlugType.Yellow },
    { name: "Purple Slugs", key: SlugType.Purple }
  ];

  function handleCollapseToggle(name: InteractiveMapMenuTopLevel) {
    return () => setOpenedMenus({ ...openedMenus, [name]: !openedMenus[name] });
  }

  function handleToggleFilter<T extends keyof typeof selection>(
    type: T,
    key: keyof typeof selection[T]
  ) {
    return () =>
      onSelectionChange({
        ...selection,
        [type]: {
          ...selection[type],
          [key]: !selection[type][key]
        }
      });
  }

  function handleToggleAll(value: boolean) {
    const newSelection: typeof selection = {
      nodes: {
        BAUXITE: value,
        CATERIUM: value,
        COAL: value,
        COPPER: value,
        GEYSER: value,
        IRON: value,
        LIMESTONE: value,
        OIL: value,
        QUARTZ: value,
        SAM: value,
        SULFUR: value,
        UNKNOWN: value,
        URANIUM: value
      },
      pods: value,
      quality: {
        IMPURE: value,
        PURE: value,
        NORMAL: value,
        UNKNOWN: value
      },
      slugs: {
        GREEN: value,
        YELLOW: value,
        PURPLE: value,
        UNKNOWN: false
      }
    };

    return () => onSelectionChange(newSelection);
  }

  return (
    <List component="nav">
      <div style={{ padding: 16 }}>
        <img width="100%" alt="satisfactory-map-logo" src="/logo.png" />
      </div>
      <ListItem>
        <ListItemText primary="Select" />
        <ListItemSecondaryAction>
          <Button color="primary" onClick={handleToggleAll(true)}>
            All
          </Button>
          <Button color="primary" onClick={handleToggleAll(false)}>
            None
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      {nodeQualityMenus.map(({ name, key }) => (
        <ListItem
          key={key}
          onClick={handleToggleFilter("quality", key)}
          style={{ paddingLeft: 32 }}
          button={true}
        >
          <ListItemIcon>
            {NODEQUALITY_ICONS[key as keyof typeof NODEQUALITY_ICONS]}
          </ListItemIcon>
          <ListItemText primary={name} />
          <ListItemSecondaryAction>
            <Checkbox
              onClick={handleToggleFilter("quality", key)}
              checked={selection.quality[key]}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      <Divider style={{ marginTop: 16 }} />
      {nodeMenus.map(({ name, key }) => (
        <ListItem
          key={key}
          onClick={handleToggleFilter("nodes", key)}
          style={{ paddingLeft: 32 }}
          button={true}
        >
          <ListItemIcon>
            <svg
              viewBox="0 0 38 37"
              height="30"
              width="30"
              version="1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 34l-2-11 9-8-12-2-5-11-5 11-12 2 9 8-2 11 10-5 10 5z"
                fill={getDepositColor(key)}
                stroke="#fff"
                strokeWidth="2"
                fillRule="evenodd"
              />
            </svg>
          </ListItemIcon>
          <ListItemText primary={name} />
          <ListItemSecondaryAction>
            <Checkbox
              onClick={handleToggleFilter("nodes", key)}
              checked={selection.nodes[key]}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      {slugMenus.map(({ name, key }) => (
        <ListItem
          key={key}
          onClick={handleToggleFilter("slugs", key)}
          style={{ paddingLeft: 32 }}
          button={true}
        >
          <ListItemIcon>
            <svg
              viewBox="0 0 38 37"
              height="30"
              width="30"
              version="1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29 34l-2-11 9-8-12-2-5-11-5 11-12 2 9 8-2 11 10-5 10 5z"
                fill={getSlugColor(key)}
                stroke="#fff"
                strokeWidth="2"
                fillRule="evenodd"
              />
            </svg>
          </ListItemIcon>
          <ListItemText primary={name} />
          <ListItemSecondaryAction>
            <Checkbox
              onClick={handleToggleFilter("slugs", key)}
              checked={selection.slugs[key]}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
      <ListItem
        onClick={() =>
          onSelectionChange({ ...selection, pods: !selection.pods })
        }
        style={{ paddingLeft: 32 }}
        button={true}
      >
        <ListItemIcon>
          <svg
            viewBox="0 0 40 40"
            height="30"
            width="30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="38"
              height="38"
              rx="8"
              fill="deeppink"
              stroke="#fff"
              strokeWidth="2"
              fillRule="evenodd"
            />
          </svg>
        </ListItemIcon>
        <ListItemText primary="Drop pods" />
        <ListItemSecondaryAction>
          <Checkbox
            onClick={() =>
              onSelectionChange({ ...selection, pods: !selection.pods })
            }
            checked={selection.pods}
          />
        </ListItemSecondaryAction>
      </ListItem>
      {/* <ListItem onClick={handleCollapseToggle("deposits")} button={true}>
        <ListItemText primary="Deposits" />
        <ListItemIcon style={{ marginRight: 0 }}>
          {openedMenus.deposits ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
      </ListItem>
      <ListItem onClick={handleCollapseToggle("creatures")} button={true}>
        <ListItemText primary="Creatures" />
        <ListItemIcon style={{ marginRight: 0 }}>
          {openedMenus.creatures ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
      </ListItem> */}
      <div style={{ padding: 16, textAlign: "center" }}>
        <a
          style={{ textDecoration: "none" }}
          href="https://github.com/LancelotP/satisfactory-map"
          target="__blank"
        >
          Github
        </a>
      </div>
    </List>
  );
};

const NODEQUALITY_ICONS = {
  [ResourceNodeQuality.Impure]: (
    <svg
      viewBox="0 0 40 40"
      height="30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2.24L1.62 39h36.76L20 2.24z"
        fill="red"
        stroke="#fff"
        strokeWidth="2"
        fillRule="evenodd"
      />
    </svg>
  ),
  [ResourceNodeQuality.Normal]: (
    <svg
      viewBox="0 0 40 40"
      height="30"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6 20L20 1.6 38.4 20 20 38.4z"
        fill="red"
        stroke="#fff"
        strokeWidth="2"
        fillRule="evenodd"
      />
    </svg>
  ),
  [ResourceNodeQuality.Pure]: (
    <svg
      viewBox="0 0 38 37"
      height="30"
      width="30"
      version="1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29 34l-2-11 9-8-12-2-5-11-5 11-12 2 9 8-2 11 10-5 10 5z"
        fill="red"
        stroke="#fff"
        strokeWidth="2"
        fillRule="evenodd"
      />
    </svg>
  )
};
