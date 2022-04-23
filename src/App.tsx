import Router from './Router';
import GlobalStyle from './Styles';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './Styles';

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
