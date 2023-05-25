import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';


function App() {
  const [darkMode,setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette:{
      mode:paletteType,
      background:{
        default:  paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  });
  
  const handleDarkMode = () =>{
    setDarkMode(!darkMode);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header darkMode={darkMode} handleDarkMode={handleDarkMode}/> 
        <Container>
          <Outlet/>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
