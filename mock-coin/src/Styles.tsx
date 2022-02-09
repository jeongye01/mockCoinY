import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  *{
    box-sizing:border-box;
  }
  body{
    font-family: 'Source Sans Pro', sans-serif;
    background-color:${(props) => props.theme.bgColor};
    color:${(props) => props.theme.textColor};
    font-size:16px;
  }
  a{
    text-decoration:none;
    color:inherit;
  }
`;

export const darkTheme: DefaultTheme = {
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  bgColor: 'black',
  textColor: 'black',
  accentColor: '#fbc531',
  lineColor: '#dcdde1',
  panelColor: '#ffffff',
  blue: '#0097e6',
  red: '#e84118',
};
export const lightTheme: DefaultTheme = {
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  bgColor: '#FAFAFA',
  textColor: 'black',
  accentColor: '#fbc531',
  lineColor: '#D3D3D3',
  panelColor: '#ffffff',
  blue: '#0097e6',
  red: '#e84118',
};
export default GlobalStyle;
