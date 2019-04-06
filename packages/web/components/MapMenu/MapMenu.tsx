import React from "react";

import * as S from "./MapMenu.style";
import { withTheme, ThemeInterface } from "../../themes/styled";
import { MarkerSelection } from "../SMap/utils/getDefaultSelection";
import { LocateMeBtn } from "../LocateMeBtn/LocateMeBtn";
import ImpureSvg from "./Impure.svg";
import NormalSvg from "./Normal.svg";
import PureSvg from "./Pure.svg";

type Props = {
  theme: ThemeInterface;
  selection: MarkerSelection;
  embed: boolean;
  onSelectionChange: (s: MarkerSelection) => void;
  onLocationChange: (pos: PlayerLocation[]) => void;
};

type State = {
  isOpen: boolean;
};

class MapMenu extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.renderQualities = this.renderQualities.bind(this);
    this.renderNodes = this.renderNodes.bind(this);
    this.renderSlugs = this.renderSlugs.bind(this);
    this.toggleNodes = this.toggleNodes.bind(this);
    this.toggleSlugs = this.toggleSlugs.bind(this);
  }

  toggleNodes(val: boolean) {
    const { selection, onSelectionChange } = this.props;

    return () => {
      onSelectionChange({
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
      });
    };
  }

  toggleSlugs(val: boolean) {
    const { selection, onSelectionChange } = this.props;

    return () => {
      onSelectionChange({
        ...selection,
        slugs: {
          green: val,
          yellow: val,
          purple: val
        }
      });
    };
  }

  renderQualities() {
    const { selection, onSelectionChange } = this.props;

    const nodes = [
      { key: "impure", name: "Impure", icon: ImpureSvg },
      { key: "normal", name: "Normal", icon: NormalSvg },
      { key: "pure", name: "Pure", icon: PureSvg }
    ];

    return nodes.map(node => (
      <S.Quality key={node.key}>
        <input
          checked={
            selection.quality[node.key as keyof typeof selection.quality]
          }
          onChange={e =>
            onSelectionChange({
              ...selection,
              quality: {
                ...selection.quality,
                [node.key]: e.target.checked
              }
            })
          }
          id={`node_${node.key}`}
          type="checkbox"
          name={node.key}
        />
        <label htmlFor={`node_${node.key}`}>
          <S.QualityIcon style={{ backgroundImage: `url(${node.icon})` }} />
          {node.name}
        </label>
      </S.Quality>
    ));
  }

  renderNodes() {
    const {
      theme: {
        colors: {
          markers: { resourceNodes: rn }
        }
      },
      selection,
      onSelectionChange,
    } = this.props;

    const nodes = [
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
      { key: "sam", name: "S.A.M." }
    ];

    return nodes.map(node => (
      <S.Node key={node.key}>
        <input
          checked={selection.nodes[node.key as keyof typeof selection.nodes]}
          onChange={e =>
            onSelectionChange({
              ...selection,
              nodes: {
                ...selection.nodes,
                [node.key]: e.target.checked
              }
            })
          }
          id={`node_${node.key}`}
          type="checkbox"
          name={node.key}
        />
        <label
          htmlFor={`node_${node.key}`}
          style={{
            backgroundColor: rn[node.key as keyof typeof rn],
            borderColor: rn[node.key as keyof typeof rn]
          }}
        >
          {node.name}
        </label>
      </S.Node>
    ));
  }

  renderSlugs() {
    const {
      theme: {
        colors: {
          markers: { slugs }
        }
      },
      selection,
      onSelectionChange
    } = this.props;

    const nodes = [
      { key: "green", name: "Green" },
      { key: "yellow", name: "Yellow" },
      { key: "purple", name: "Purple" }
    ];

    return nodes.map(node => (
      <S.Slug key={node.key}>
        <input
          checked={selection.slugs[node.key as keyof typeof selection.slugs]}
          onChange={e =>
            onSelectionChange({
              ...selection,
              slugs: {
                ...selection.slugs,
                [node.key]: e.target.checked
              }
            })
          }
          id={`slug_${node.key}`}
          type="checkbox"
          name={node.key}
        />
        <label
          htmlFor={`slug_${node.key}`}
          style={{
            backgroundColor: slugs[node.key as keyof typeof slugs],
            borderColor: slugs[node.key as keyof typeof slugs]
          }}
        >
          <S.SlugIcon
            dangerouslySetInnerHTML={{
              __html: require("./Slug.svg?include")
            }}
          />
          {node.name}
        </label>
      </S.Slug>
    ));
  }

  render() {
    const { isOpen } = this.state;
    const { embed, onLocationChange } = this.props;

    return (
      <S.Root isOpen={isOpen}>
        <S.CloseBtn
          dangerouslySetInnerHTML={{
            __html: require("./ToggleBtn.svg?include")
          }}
          onClick={() => this.setState({ isOpen: !isOpen })}
        />
        <S.Menu>
          {embed === false && (
            <S.Logo>
              <source srcSet={require("./logo.png?webp")} type="image/webp" />
              <source srcSet={require("./logo.png")} type="image/jpeg" />
              <img src={require("./logo.png")} />
            </S.Logo>
          )}
          <LocateMeBtn onLocationChange={onLocationChange} />
          <S.Section>
            <S.SectionTitle>
              <h2>Nodes</h2>
            </S.SectionTitle>
            <S.SectionContent>
              <S.SectionSubTitle>
                <h3>Purity</h3>
              </S.SectionSubTitle>
              <S.Qualities>{this.renderQualities()}</S.Qualities>
              <S.SectionSubTitle>
                <h3>Type</h3>
                <S.SectionToggle>
                  <div>Show</div>
                  <button type="button" onClick={this.toggleNodes(true)}>
                    All
                  </button>
                  <button type="button" onClick={this.toggleNodes(false)}>
                    None
                  </button>
                </S.SectionToggle>
              </S.SectionSubTitle>
              <S.Nodes>{this.renderNodes()}</S.Nodes>
            </S.SectionContent>
          </S.Section>
          <S.Section>
            <S.SectionTitle>
              <h2>
                <S.SlugIcon
                  dangerouslySetInnerHTML={{
                    __html: require("./Slug.svg?include")
                  }}
                />
                Slugs
              </h2>
              <S.SectionToggle>
                <div>Show</div>
                <button type="button" onClick={this.toggleSlugs(true)}>
                  All
                </button>
                <button type="button" onClick={this.toggleSlugs(false)}>
                  None
                </button>
              </S.SectionToggle>
            </S.SectionTitle>
            <S.SectionContent>
              <S.Slugs>{this.renderSlugs()}</S.Slugs>
            </S.SectionContent>
          </S.Section>
        </S.Menu>
      </S.Root>
    );
  }
}

export default withTheme(MapMenu);
