import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
//import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraComponent, ChakraProvider, ComponentWithAs, extendTheme, StyleFunctionProps } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import HistoryRouter from './components/history-route.tsx'
import Navigation from './components/navigation-component.tsx'
import { color } from 'framer-motion'

export const queryClient = new QueryClient()
const browserHistory = createBrowserHistory();


import { ComponentStyleConfig } from "@chakra-ui/react";

import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);


const custom = definePartsStyle({
  field: {
    fontWeight: "600",
    fontSize: "md",
    height: '34px',
    padding: '10px',
    rounded: 'md',
    bg: 'white',
    border: '1px',
    borderColor: 'gray.400',
    color: 'teal.900',
    _hover: {
      borderColor: 'teal.700',
      bg: 'gray.50',
    },  
  },
  addon: {
    height: '34px',
    fontSize: "md",
    border: '1px solid',
    borderColor: 'gray.400',
    bg: 'teal.600',
    borderRadius: 'md',
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

// export const inputTheme = defineMultiStyleConfig({
//   variants: { custom },
// })

const baseStyle = definePartsStyle({
  field: {
    fontWeight: "600",
    fontSize: "md",
    padding: '10px',
    rounded: 'md',
    bg: 'white',
    border: '1px',
    borderColor: 'gray.400',
    color: 'teal.900',
    _hover: {
      borderColor: 'teal.700',
      bg: 'gray.50',
    },  
  },
  addon: {
    fontSize: "md",
    border: '1px solid',
    borderColor: 'gray.400',
    bg: 'teal.600',
    borderRadius: 'md',
    color: 'white',

  },
});

export const inputTheme = defineMultiStyleConfig({ baseStyle });

const selectStyle: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "600",
    fontSize: "md",
    padding: '10px',
    rounded: 'md',
    border: '1px',
    borderColor: 'black',
  },
  sizes: {
    xl: {
      h: "56px",
      fontSize: "lg",
      px: "32px",
    },
  },  
  variants: {
    bgWhite: {      
      bg: 'white',
      border: '1px',
      borderColor: 'gray.400',
      color: 'teal.700',
      _hover: {
        borderColor: 'teal.700',
        bg: 'gray.50',
      },      
    },
    bgTeal: {      
      bg: 'teal.600',
      border: '1px',
      borderColor: 'teal.600',
      color: 'white', 
    },
    // none: {
    //   _hover: 'none',
    //   cursor: 'auto',
    //   border: 'none',
    // },
    // disabled: {
      
    // }
  },

  defaultProps: {
    size: "lg",
    variant: "bgWhite",
  },
}

const buttonStyle: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "600",
    textTransform: 'uppercase',
    size: 'sm',
    fontSize: "sm",
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    rounded: 'md',
  },
  sizes: {
    xl: {
      h: "56px",
      fontSize: "lg",
      px: "32px",
    },
  },  
  variants: {
    bgWhite: {      
      bg: 'white',
      border: '1px',
      borderColor: 'gray.400',
      color: 'teal.700',
      _hover: {
        borderColor: 'teal.700',
        bg: 'gray.50',
      },
      _active: {
        bg: 'teal.500',
        border: '1px',
        borderColor: 'teal.500',
        color: 'white',

      },

    },
    bgTeal: {      
      bg: 'teal.600',
      border: '1px',
      borderColor: 'teal.600',
      color: 'white', 
    },
    none: {
      _hover: 'none',
      cursor: 'auto',
      border: 'none',
    },
    disabled: {
      
    }
  },

  defaultProps: {
    size: "lg",
    variant: "bgWhite",
  },
};

const theme = extendTheme({
  // styles: {
  //   global: {
  //     'body': {
  //       backgroundImage: new URL('../public/large-triangles.svg'),
  //     },

  //   },
  // },
  layerStyles:{ 
    form: {
      bg: 'white',
      border: '1px solid',
      borderColor: 'gray.300',
      rounded: 'md',
      shadow: 'xl',
      _hover: {
        borderColor: 'teal.600',
      },      
    },
    secondaryNavigation: {
      color: 'red',
      isActive: {
        color: 'red',
      },
      _hover: {
        color: 'blue',
      }
    },
    // paginationButton: {
    //   display:'flex',
    //   justifyContent:'center',
    //   alignItems: 'center',
    //   cursor:'pointer',
    //   minH:'40px',
    //   minW:'40px',
    //   padding:'8px',
    //   border:'1px',
    //   borderColor:'gray.400',
    //   rounded:'md',
    //   _hover: {borderColor: 'teal.600'},
    //   fontWeight:'600',
    // }
  },
  components: {
    Button: buttonStyle,
    Select: selectStyle,
    Input: inputTheme,
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HistoryRouter history={browserHistory}>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>        
        <App />        
      </ChakraProvider>
    </QueryClientProvider>    
    </HistoryRouter>
  </StrictMode>,
)

    