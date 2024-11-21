import MasterDataService from './master-data-service'
import { Route, Routes } from 'react-router-dom';
import { RoutePath } from './constants'
import Navigation from './components/navigation-component'
import { Box, flexbox, Grid, GridItem } from '@chakra-ui/react'
import NotFoundPage from './components/not-found-page'
import RegistrationCertificatesPage from './master-data-service/services/registration-certificates/pages/registration-certificates-page';
import RegistrationCertificateByIdPage from './master-data-service/services/registration-certificates/pages/registration-certificate-by-id-page';
import CreateRegistrationCertificatePage from './master-data-service/services/registration-certificates/pages/create-registration-certificate-page';
import NameOfDrugsPage from './master-data-service/services/name-of-drugs/pages/name-of-drugs-page';
import RegistrationCertificatesIndexPage from './master-data-service/services/registration-certificates/pages/registration-certificates-index-page';
import NameOfDrugsIndexPage from './master-data-service/services/name-of-drugs/pages/name-of-drugs-index-page';


//background-color: #ffffff;
//background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 200 200'%3E%3Cpolygon fill='%23DCEFFA' points='100 0 0 100 100 100 100 200 200 100 200 0'/%3E%3C/svg%3E");

function App() {
  return (


    

    <Box>
      <Grid
        templateAreas={`
          "header header"
          "nav main"
          "footer footer"
        `}
        gridTemplateColumns={'250px 1fr'}
        gridTemplateRows={'50px 1fr 50px'}
        height={'100vh'}
        //minWidth={'1460px'}
        //marginX={'auto'}
        // color='blackAlpha.700'
        // fontWeight='bold'
      >
        
        <GridItem flex={1} bg={'white'} borderBottom={'1px'}  area={'header'} flexGrow={'initial'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
          <Box >HEADER</Box>
        </GridItem>  

        <GridItem bg='white' borderRight={'1px'}  area={'nav'}>
          <Navigation/>
        </GridItem>        
        
        <GridItem area={'main'} bg='white' padding={'20px'}>
          <Routes>
            <Route path="*" element={<NotFoundPage />}/>
            
            <Route path={`${RoutePath.index.path}${RoutePath.masterData.path}`} >              
              <Route index element={<MasterDataService />} />

              <Route path={`${RoutePath.registrationCertificate.path}`} element={<RegistrationCertificatesIndexPage />}>                
                <Route index element={<RegistrationCertificatesPage />} />
                <Route path='*' element={<NotFoundPage />}/>
                <Route path='create' element={<CreateRegistrationCertificatePage />} />
                <Route path=":id" element={<RegistrationCertificateByIdPage />} />
              </Route>

              <Route path={`${RoutePath.nameOfDrugs.path}`} element={<NameOfDrugsIndexPage />}>                
                <Route index element={<NameOfDrugsPage />} />
                <Route path='*' element={<NotFoundPage />}/>
                {/* <Route path='create' element={<CreateRegistrationCertificatePage />} />
                <Route path=":id" element={<RegistrationCertificateByIdPage />} /> */}
              </Route>   
            </Route>           
          </Routes>
        </GridItem>

        <GridItem bg='teal.800' color={'white'} area={'footer'} display={'flex'} justifyContent={'center'} alignItems={'center'}>          
          <Box>FOOTER</Box>
        </GridItem>  
        
      </Grid>
    </Box>


  )
}

export default App
