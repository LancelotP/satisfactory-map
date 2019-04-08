import styled from "../../../../themes/styled";

export const Root = styled.aside`
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  color: ${({ theme }) => theme.colors.black};

  & label {
    display: block;
  }
`;

export const LogoWrapper = styled.div`
  padding: 24px 24px 0;

  & > img {
    width: 100%;
  }
`;

export const Content = styled.menu`
  padding: 0 24px 24px;
`;

export const Title = styled.h2`
  font-family: IBMPlexSans-Bold;
  font-size: 32px;
  margin: 0;
  margin-top: 24px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.black};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Section = styled.section`
  padding-left: 24px;
`;

export const SectionTitle = styled.h3`
  font-family: IBMPlexSans-Bold;
  font-size: 16px;
  text-align: left;
  color: ${({ theme }) => theme.colors.black};

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionSelect = styled.div`
  display: flex;
  align-items: center;

  & > button {
    margin-left: 8px;
    padding: 0;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: noto;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: #3455db;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

export const ToggleBtn = styled.label`
  width: 100%;

  & > input {
    display: none;
  }

  & > input:checked ~ div {
    color: white;
  }

  & > input:not(:checked) ~ div {
    background: transparent !important;
    color: ${({ theme }) => theme.colors.black} !important;
  }

  & > div {
    cursor: pointer;
    padding: 8px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${({ theme }) => theme.colors.primary500};
    background: ${({ theme }) => theme.colors.primary500};
    text-align: center;
    color: #343434;
    transition: all 0.242s ease;
  }
`;

export const Purity = styled.div`
  display: flex;
  justify-content: space-between;

  & > ${ToggleBtn} {
    width: 30%;
  }
`;

export const Nodes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -8px;

  & > ${ToggleBtn} {
    margin: 8px;
    width: calc(50% - 16px);
  }
`;

export const Slugs = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;

  & > ${ToggleBtn} {
    width: 30%;
  }
`;

export const Artifacts = styled.div`
  display: flex;
  justify-content: space-between;
  margin: -8px;
  margin-top: 8px;

  & > ${ToggleBtn} {
    margin: 8px;
    width: calc(50% - 16px);
  }
`;
