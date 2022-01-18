import "../styles/globals.scss";
import type { AppProps } from "next/app";
import MainNavigation from "../components/shared/Navigation/MainNavigation";
import React from "react";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`}
      />
      <MainNavigation />
      <main>
        <Component {...pageProps} />
      </main>
    </React.Fragment>
  );
}

export default MyApp;
