import * as React from "react";

import * as S from "./Menu.style";
import {
  IconStyleContext,
  IconSizeContext,
  SelectionContext
} from "../../InteractiveMap";
import { UserThemeContext } from "../../../../pages/_app";
import { LocateMeBtn } from "../LocateMeBtn/LocateMeBtn";

type Props = {
  onSaveLoaded: (d: any) => void;
  isOpen: boolean;
  showLogo: boolean;
};

export const Menu = (props: Props) => {
  const { onSaveLoaded, isOpen, showLogo } = props;
  const { setMode } = React.useContext(IconStyleContext);
  const { iconSize, setIconSize } = React.useContext(IconSizeContext);
  const { setTheme } = React.useContext(UserThemeContext);
  const { selection, setSelection } = React.useContext(SelectionContext);

  function handleIconSizeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIconSize(parseFloat(e.target.value));

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('iconSize', e.target.value);
    }
  }

  function generateHandle(key: keyof typeof selection) {
    return {
      checked: selection[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setSelection({
          ...selection,
          [key]: e.target.checked
        })
    };
  }

  return (
    <S.Root style={{ width: isOpen ? 360 : 0 }}>
      {showLogo !== false && (
        <S.LogoWrapper>
          <img src={require("./logo.png")} alt="Satisfactory map logo" />
        </S.LogoWrapper>
      )}
      <S.Content>
        <LocateMeBtn onSaveLoaded={onSaveLoaded} />
        <S.Title>Nodes</S.Title>
        <S.Section>
          {/* <label>
            <input type="checkbox" {...generateHandle("n_exploited")} />
            Hide exploited
          </label> */}
          <S.ToggleBtn>
            <input type="checkbox" {...generateHandle("n_blocked")} />
            <div>{selection.n_blocked ? "Show" : "Hide"} blocked ones</div>
          </S.ToggleBtn>
          <br />
          <S.ToggleBtn>
            <input type="checkbox" {...generateHandle("n_exploited")} />
            <div>{selection.n_exploited ? "Show" : "Hide"} exploited ones</div>
          </S.ToggleBtn>
          <S.SectionTitle>Purity</S.SectionTitle>
          <S.Purity>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("q_impure")} />
              <div>Impure</div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("q_normal")} />
              <div>Normal</div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("q_pure")} />
              <div>Pure</div>
            </S.ToggleBtn>
          </S.Purity>
          <S.SectionTitle>
            <div>Type</div>
            <S.SectionSelect>
              <button
                onClick={() =>
                  setSelection({
                    ...selection,
                    g_geysers: true,
                    n_bauxite: true,
                    n_caterium: true,
                    n_copper: true,
                    n_coal: true,
                    n_quartz: true,
                    n_oil: true,
                    n_limestone: true,
                    n_iron: true,
                    n_sam: true,
                    n_sulfur: true,
                    n_uranium: true
                  })
                }
              >
                All
              </button>
              <button
                onClick={() =>
                  setSelection({
                    ...selection,
                    g_geysers: false,
                    n_bauxite: false,
                    n_caterium: false,
                    n_copper: false,
                    n_coal: false,
                    n_quartz: false,
                    n_oil: false,
                    n_limestone: false,
                    n_iron: false,
                    n_sam: false,
                    n_sulfur: false,
                    n_uranium: false
                  })
                }
              >
                None
              </button>
            </S.SectionSelect>
          </S.SectionTitle>
          <S.Nodes>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_iron")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#CCCCCC",
                  borderColor: "#CCCCCC"
                }}
              >
                Iron
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_copper")} />
              <div
                style={{ backgroundColor: "#E65C2E", borderColor: "#E65C2E" }}
              >
                Copper
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_limestone")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#FFE7B3",
                  borderColor: "#FFE7B3"
                }}
              >
                Limestone
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_coal")} />
              <div style={{ backgroundColor: "#666", borderColor: "#666" }}>
                Coal
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_oil")} />
              <div
                style={{ backgroundColor: "#660000", borderColor: "#660000" }}
              >
                Oil
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_caterium")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#FFCC00",
                  borderColor: "#FFCC00"
                }}
              >
                Caterium
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_sulfur")} />
              <div
                style={{ backgroundColor: "#578000", borderColor: "#578000" }}
              >
                Sulfur
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_bauxite")} />
              <div
                style={{ backgroundColor: "#df896b", borderColor: "#df896b" }}
              >
                Bauxite
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_quartz")} />
              <div
                style={{ backgroundColor: "#FF6699", borderColor: "#FF6699" }}
              >
                Quartz
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_uranium")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#6FEA64",
                  borderColor: "#6FEA64"
                }}
              >
                Uranium
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("n_sam")} />
              <div
                style={{ backgroundColor: "#A424B3", borderColor: "#A424B3" }}
              >
                S.A.M
              </div>
            </S.ToggleBtn>
          </S.Nodes>
        </S.Section>
        <S.Title>
          Geysers
          <S.SectionSelect>
            <button
              onClick={() => setSelection({ ...selection, g_geysers: true })}
            >
              All
            </button>
            <button
              onClick={() => setSelection({ ...selection, g_geysers: false })}
            >
              None
            </button>
          </S.SectionSelect>
        </S.Title>
        <S.Title>
          DropPods
          <S.SectionSelect>
            <button
              onClick={() => setSelection({ ...selection, d_drops: true })}
            >
              All
            </button>
            <button
              onClick={() => setSelection({ ...selection, d_drops: false })}
            >
              None
            </button>
          </S.SectionSelect>
        </S.Title>
        <S.Section>
          <S.ToggleBtn>
            <input type="checkbox" {...generateHandle("d_collected")} />
            <div>{selection.d_collected ? "Show" : "Hide"} collected ones</div>
          </S.ToggleBtn>
        </S.Section>
        <S.Title>
          Slugs
          <S.SectionSelect>
            <button
              onClick={() =>
                setSelection({
                  ...selection,
                  s_green: true,
                  s_yellow: true,
                  s_purple: true
                })
              }
            >
              All
            </button>
            <button
              onClick={() =>
                setSelection({
                  ...selection,
                  s_green: false,
                  s_yellow: false,
                  s_purple: false
                })
              }
            >
              None
            </button>
          </S.SectionSelect>
        </S.Title>
        <S.Section>
          <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("s_collected")} />
            <div>{selection.s_collected ? "Show" : "Hide"} collected ones</div>
          </S.ToggleBtn>
          <br />
          <S.ToggleBtn>
            <input type="checkbox" {...generateHandle("s_blocked")} />
            <div>{selection.s_blocked ? "Show" : "Hide"} blocked ones</div>
          </S.ToggleBtn>
        </S.Section>
        <S.Section>
          <S.Slugs>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("s_green")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#0ad1d8",
                  borderColor: "#0ad1d8"
                }}
              >
                Green
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("s_yellow")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#f9f900",
                  borderColor: "#f9f900"
                }}
              >
                Yellow
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("s_purple")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#d100ed",
                  borderColor: "#d100ed"
                }}
              >
                Purple
              </div>
            </S.ToggleBtn>
          </S.Slugs>
        </S.Section>
        <S.Title>
          Artifacts
          <S.SectionSelect>
            <button
              onClick={() =>
                setSelection({ ...selection, a_mercer: true, a_somer: true })
              }
            >
              All
            </button>
            <button
              onClick={() =>
                setSelection({ ...selection, a_mercer: false, a_somer: false })
              }
            >
              None
            </button>
          </S.SectionSelect>
        </S.Title>
        <S.Section>
          {/* <label>
            <input type="checkbox" {...generateHandle("a_collected")} />
            Hide collected
          </label> */}
          <S.ToggleBtn>
            <input type="checkbox" {...generateHandle("a_blocked")} />
            <div>{selection.a_blocked ? "Show" : "Hide"} blocked ones</div>
          </S.ToggleBtn>
          <S.Artifacts>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("a_somer")} />
              <div
                style={{
                  backgroundColor: "#410f2b",
                  borderColor: "#410f2b"
                }}
              >
                Somersloop
              </div>
            </S.ToggleBtn>
            <S.ToggleBtn>
              <input type="checkbox" {...generateHandle("a_mercer")} />
              <div
                style={{
                  color: "#343434",
                  backgroundColor: "#9fb8b5",
                  borderColor: "#9fb8b5"
                }}
              >
                Mercer
              </div>
            </S.ToggleBtn>
          </S.Artifacts>
        </S.Section>
        <S.Title>Options</S.Title>
        <S.Section>
          <div style={{ display: "flex", alignItems: "center" }}>
            Theme:
            <button onClick={() => setTheme("light")}>light</button>
            <button onClick={() => setTheme("dark")}>dark</button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            Mode:
            <button onClick={() => setMode("default")}>default</button>
            <button onClick={() => setMode("colorblind")}>colorblind</button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            Icon size:
            <input
              type="range"
              value={`${iconSize}`}
              onChange={handleIconSizeChange}
              step="0.1"
              min="0.5"
              max="2"
            />
          </div>
        </S.Section>
      </S.Content>
      <S.GH
        href="https://github.com/LancelotP/satisfactory-map"
        target="__blank"
      >
        Source code available on GitHub
      </S.GH>
    </S.Root>
  );
};
