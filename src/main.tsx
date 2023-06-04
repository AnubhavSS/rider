import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider,extendTheme } from '@chakra-ui/react'
const customTheme = extendTheme({
  colors: {
    customGreen: "#1EA509 ", // Replace with your custom color value
    customBlue:"#317BF4"
  },
});


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
