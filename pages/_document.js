import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";

const getInitialProps = createGetInitialProps();

export default class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
          <link
            href='https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <div id='drawerportal' />
          <div id='backdrop' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
