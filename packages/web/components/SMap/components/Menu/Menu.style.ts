import styled from "../../../../themes/styled";

export const Root = styled.aside`
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
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

export const SliderWrapper = styled.div`
  margin-top: 24px;

  & > p {
    text-align: center;
    margin-top: 0;
    margin-bottom: 8px;
  }
`;

export const ToggleWrapper = styled.label`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > h3 {
    font-size: 16px;
    font-weight: normal;
    margin: 0;
  }
`;

export const Expand = styled.div`
  margin-top: 8px;
`;

export const ExpandContent = styled.div`
  padding-left: 24px;
`;

export const LocateMeBtnWrapper = styled.div`
  text-align: center;
`;

export const LocateMeBtn = styled.button`
  cursor: pointer;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  background: #f8da00;
  outline: none;
  border: none;
  text-transform: uppercase;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.242s ease;
  margin: 8px auto;
  text-align: center;

  &:hover,
  &:focus {
    background-color: #f3b400;
  }
`;
