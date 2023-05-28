import { useEffect, useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useStoreContext } from '../context/StoreContext';
import agent from '../api/agent';
import { getCookie } from '../util/util';
import LoadingComponent from './LoadingComponent';

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const buyerId = getCookie("buyerId");
    
    if (buyerId)
    {
        agent.Bastket.list()
          .then(basket => setBasket(basket))
          .catch(error => console.log(error))
          .finally(() => setLoading(false))
    }
    else
    {
      setLoading(false);
    }

  },[setBasket])



  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  });

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message='Initialising App...'/>

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
        <CssBaseline />
        <Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
