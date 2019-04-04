import React from "react";

import * as S from "./MapMenu.style";
import { withTheme, ThemeInterface } from "../../themes/styled";

type Props = {
  theme: ThemeInterface;
};

class MapMenu extends React.PureComponent<Props> {
  renderQualities() {
    const nodes = [
      { key: "impure", name: "Impure" },
      { key: "normal", name: "Normal" },
      { key: "pure", name: "Pure" }
    ];

    return nodes.map(node => (
      <S.Quality key={node.key}>
        <input id={`node_${node.key}`} type="checkbox" name={node.key} />
        <label htmlFor={`node_${node.key}`}>
          <S.QualityIcon />
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
      }
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
        <input id={`node_${node.key}`} type="checkbox" name={node.key} />
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
      }
    } = this.props;

    const nodes = [
      { key: "green", name: "Green" },
      { key: "yellow", name: "Yellow" },
      { key: "purple", name: "Purple" }
    ];

    return nodes.map(node => (
      <S.Slug key={node.key}>
        <input id={`node_${node.key}`} type="checkbox" name={node.key} />
        <label
          htmlFor={`node_${node.key}`}
          style={{
            backgroundColor: slugs[node.key as keyof typeof slugs],
            borderColor: slugs[node.key as keyof typeof slugs]
          }}
        >
          <S.SlugIcon />
          {node.name}
        </label>
      </S.Slug>
    ));
  }

  render() {
    return (
      <S.Root>
        <S.Logo>
          <source srcSet={require("./logo.png?webp")} type="image/webp" />
          <source srcSet={require("./logo.png")} type="image/jpeg" />
          <img src={require("./logo.png")} />
        </S.Logo>
        <S.LocateButton>Locate Players</S.LocateButton>
        <S.Section>
          <S.SectionTitle>Nodes</S.SectionTitle>
          <S.SectionContent>
            <S.SectionSubTitle>Purity</S.SectionSubTitle>
            <S.Qualities>{this.renderQualities()}</S.Qualities>
            <S.SectionSubTitle>Type</S.SectionSubTitle>
            <S.Nodes>{this.renderNodes()}</S.Nodes>
          </S.SectionContent>
        </S.Section>
        <S.Section>
          <S.SectionTitle>
            <S.SlugIcon />
            Slugs
          </S.SectionTitle>
          <S.SectionContent>
            <S.Slugs>{this.renderSlugs()}</S.Slugs>
          </S.SectionContent>
        </S.Section>
      </S.Root>
    );
  }
}

export default withTheme(MapMenu);
