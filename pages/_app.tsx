import "../styles/globals.scss";
import type { AppProps } from "next/app";
import MainNavigation from "../components/shared/Navigation/MainNavigation";
import React from "react";
import Script from "next/script";
import AuthContextProvider from "../components/shared/context/auth-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}`}
      />
      <MainNavigation />
      <main>
        <Component {...pageProps} />
      </main>
    </AuthContextProvider>
  );
}

export default MyApp;
