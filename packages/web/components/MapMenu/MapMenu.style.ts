import styled from "../../themes/styled";
import slugIcon from "../Icons/slug.svg";

export const Root = styled.aside`
  flex: 1 1 auto;
  width: 360px;
  max-width: calc(100vw - 45px);
  position: relative;
  z-index: 10000;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.4);
`;

export const Menu = styled.div`
  padding: 24px 40px;
  background: white;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

export const Logo = styled.picture`
  & > img {
    margin-bottom: 32px;
  }
`;

export const LocateButton = styled.button`
  width: 100%;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  outline: none;
  border: none;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary500};
  cursor: pointer;

  transition: background 0.242s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary700};
  }

  font-family: "ibm_plex";
  font-weight: bold;
`;

export const Section = styled.section`
  margin-top: 32px;
  margin-left: -16px;
`;

export const SectionTitle = styled.h2`
  font-size: 32px;
  line-height: 42px;
  font-family: "ibm_plex";
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
`;

export const SectionSubTitle = styled.h3`
  margin: 0;
  margin-top: 24px;
  font-size: 16px;
  line-height: 20px;
  font-family: "ibm_plex";
  font-weight: bold;
`;

export const SectionContent = styled.div`
  padding-left: 24px;
`;

export const Nodes = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
  margin-top: 16px;
`;

export const Node = styled.div`
  display: flex;
  padding: 8px;
  flex: 0 1 50%;

  & > input {
    display: none;
  }

  & > input:not(:checked) + label {
    color: black;
    background: transparent !important;
  }

  & > label {
    transition: all 0.242s ease;
    color: white;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid;
    height: 56px;
  }
`;

export const Slugs = styled.div`
  display: flex;
  margin: -8px;
  margin-top: 16px;
`;

export const Slug = styled.div`
  display: flex;
  padding: 8px;
  flex: 1 1 0;

  & > input {
    display: none;
  }

  & > input:not(:checked) + label {
    color: black;
    background: transparent !important;
  }

  & > label {
    padding: 8px 0;
    transition: all 0.242s ease;
    color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid;
  }
`;

export const SlugIcon = styled.div`
  display: inline-flex;
  background-position: center center;
  background-size: contain;
  background-image: url(${slugIcon});
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
`;

export const Qualities = styled.div`
  display: flex;
  margin: -8px;
  margin-top: 16px;
`;

export const Quality = styled.div`
  display: flex;
  padding: 8px;
  flex: 1 1 0;

  & > input {
    display: none;
  }

  & > input:not(:checked) + label {
    color: black;
    background: transparent;
  }

  & > label {
    background: ${({ theme }) => theme.colors.primary500};
    padding: 8px 0;
    transition: all 0.242s ease;
    color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.primary500};
  }
`;

export const QualityIcon = styled.div`
  display: inline-flex;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: contain;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
`;

export const CloseBtn = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.white};
  transform: rotate(45deg);
  top: 50%;
  margin-top: -44px;
  right: 0;
  height: 88px;
  width: 88px;
  z-index: -1;
  margin-right: -30px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.4);
  cursor: pointer;

  & > img {
    width: 20px;
    height: 20px;
    position: absolute;
    transform: rotate(-45deg);
    top: 12px;
    right: 12px;
  }
`;
