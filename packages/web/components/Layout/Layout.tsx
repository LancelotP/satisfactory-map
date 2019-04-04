import { GlobalStyle } from "../../themes/styled";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
  title: string;
};

export const Layout = (props: Props) => {
  const { children, title } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <GlobalStyle />
      {children}
    </>
  );
};
