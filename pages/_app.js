import { createGlobalStyle, ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil"; 
import "tailwindcss/tailwind.css";

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

function MyApp({ Component, pageProps }) {
 return (
   <>
     <GlobalStyle />
     <RecoilRoot>
       <Component {...pageProps} />
     </RecoilRoot>
   </>
 );
}

export default MyApp;
