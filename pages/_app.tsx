import { useEffect } from 'react'

import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast';
import { darkTheme, lightTheme } from '../themes/'
import Spinner from "../core/components/ui/Spinner"
import { ProviderSpinner } from '../core/context/providerSpinner';
import { ProviderTheme } from '../core/context/providerTheme';
import { Sidebar } from '../core/components/ui/sidebar/Sidebar';


function MyApp({ Component, pageProps }: AppProps) {


  useEffect(() => {

  }, [tema])


  const ISSERVER = typeof window === "undefined";
  var tema;

  if (!ISSERVER) {
    tema = localStorage.getItem("tema");
  }

  return (
    <NextUIProvider theme={tema === "true" ? lightTheme : darkTheme}>
      <ProviderTheme>
        <ProviderSpinner>
          <Spinner />
          <Sidebar>
            <Component {...pageProps} />
          </Sidebar>
          <Toaster position='top-left' />
        </ProviderSpinner>
      </ProviderTheme>
    </NextUIProvider>
  )
}

export default MyApp
