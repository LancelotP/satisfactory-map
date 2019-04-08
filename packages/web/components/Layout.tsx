import * as React from "react";
import Head from "next/head";
import { GlobalStyle } from "../themes/styled";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Satisfactory map"
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="google" content="notranslate" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/public/apple-touch-icon.png?v=alQaapNnMd"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/public/favicon-32x32.png?v=alQaapNnMd"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/public/favicon-16x16.png?v=alQaapNnMd"
      />
      <link
        rel="manifest"
        href="/static/public/site.webmanifest?v=alQaapNnMd"
      />
      <link
        rel="mask-icon"
        href="/static/public/safari-pinned-tab.svg?v=alQaapNnMd"
        color="#feaf4a"
      />
      <link
        rel="shortcut icon"
        href="/static/public/favicon.ico?v=alQaapNnMd"
      />
      <meta name="msapplication-TileColor" content="#feaf4a" />
      <meta name="theme-color" content="#feaf4a" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      <meta
        name="description"
        content="Interactive map with resource nodes, geysers, slugs, drop pods and more to come"
      />
      <meta property="og:image:height" content="252" />
      <meta property="og:image:width" content="482" />
      <meta
        property="og:description"
        content="Interactive map for Satisfactory including resource nodes, slugs, drop pods and much more to come. Daily releases of new features"
      />
      <meta property="og:title" content="Satisfactory Interactive Map" />
      <meta property="og:url" content="https://www.satisfactorymap.com" />
      <meta
        property="og:image"
        content="https://www.satisfactorymap.com/static/public/og-image.jpg"
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
        var _paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(["trackPageView"]);
        _paq.push(["enableLinkTracking"]);
        (function() {
          var u = "https://satisfactorymap.matomo.cloud/";
          _paq.push(["setTrackerUrl", u + "matomo.php"]);
          _paq.push(["setSiteId", "1"]);
          var d = document,
            g = d.createElement("script"),
            s = d.getElementsByTagName("script")[0];
          g.type = "text/javascript";
          g.async = true;
          g.defer = true;
          g.src = u + "matomo.js";
          s.parentNode.insertBefore(g, s);
        })();
      `
        }}
      />
    </Head>
    <GlobalStyle />
    {children}
  </div>
);

export default Layout;
