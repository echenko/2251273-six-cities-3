// Import Styles
import { createGlobalStyle } from 'styled-components';

// Create GlobalStyle
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

// Export GlobalStyle
export {GlobalStyle};
