import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: futura;
    src: url(/fonts/futura/futura.ttf);
  }
  * {
    font-family: futura;
  }
  body {
    background: linear-gradient(315deg,#1b0f41,#fff);

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
