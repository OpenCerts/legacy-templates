import Head from "next/head";

const fonts = () => (
  <Head>
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600"
      rel="stylesheet"
    />
    <style>{`
      .RobotoLight {
        font-family: Roboto, sans-serif;
        font-weight: 300;
      }
      .RobotoRegular {
        font-family: Roboto, sans-serif;
        font-weight: 400;
      }
      .RobotoMedium {
        font-family: Roboto, sans-serif;
        font-weight: 500;
      }
      .RobotoBold {
        font-family: Roboto, sans-serif;
        font-weight: 600;
      }
    `}</style>
  </Head>
);

export default fonts;
