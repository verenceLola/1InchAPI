import { Global, css } from "@emotion/react";
import type { AppProps } from "next/app";

import localFont from "@next/font/local";

const circularStdFont = localFont({ src: "./CircularStd.otf" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          * {
            margin: 0;
          }

          html,
          body {
            height: 100%;
          }

          body {
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }

          img,
          picture,
          video,
          canvas,
          svg {
            display: block;
            max-width: 100%;
          }

          input,
          button,
          textarea,
          select {
            font: inherit;
          }

          p,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            overflow-wrap: break-word;
          }

          #root,
          #__next {
            isolation: isolate;
          }
        `}
      />
      <main className={circularStdFont.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
