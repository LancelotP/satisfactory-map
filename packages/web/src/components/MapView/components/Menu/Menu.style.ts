import styled from "../../../../themes/styled";

export const Root = styled.div<{ isOpen: boolean }>`
  width: ${({ isOpen }) => (isOpen ? 300 : 0)};
  flex: 0 0 auto;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  transition: width 0.242s ease;
  flex-direction: column;

  @media (min-width: 1200px) {
    width: 300px !important;
  }
`;

export const Logo = styled.img`
  width: 100%;
`;

export const Header = styled.header`
  padding: 24px;
`;

export const Body = styled.aside`
  flex: 1 1 0;
  padding: 0 24px;
  overflow-y: auto;

  & > ul {
    margin: 0;
    padding: 0;
  }

  & ul {
    list-style: none;
  }
`;

export const Footer = styled.footer``;
