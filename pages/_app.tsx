import "../styles/globals.scss";
import type { AppProps } from "next/app";
import MainNavigation from "../components/shared/Navigation/MainNavigation";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        <Component {...pageProps} />
      </main>
    </React.Fragment>
  );
}

export default MyApp;
