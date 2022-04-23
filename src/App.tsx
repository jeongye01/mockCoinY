import React from 'react';
import Router from './Router';
import GlobalStyle from './Styles';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './Styles';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';
function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
