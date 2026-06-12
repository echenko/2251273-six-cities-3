import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body,
  html {
    width: auto;
    margin: 0;
  }

  html {
    margin-left: calc(100vw - 100%);
  }
  `;

export {GlobalStyle};
