import { SessionProvider } from "next-auth/react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');

  html, 
  body {
    padding: 0; 
    margin: 0; 
    height: 100%; 
    width: 100%; 
    background-color: hsl(223, 19%, 93%); 
    font-family: 'Rubik', sans-serif;
    font-size: 16px; 
  }
`;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <GlobalStyle />
      <SessionProvider session={session}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}

export default MyApp;
