import { Box, Button, Heading, SimpleGrid, Tooltip, Text, Grid, GridItem } from "@chakra-ui/react";

import RegistrationCertificatesListComponent from "./registration-certificates-list-component";
import { ServicesApi } from "../../../../../api/constants";
import { memo, useMemo, useState } from "react";
import PaginationComponent from "../../../../../components/pagination-component";
import { useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";


const RegistrationCertificatesContainer: React.FC = () => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();

  const {data, isSuccess} = ServicesApi.registrationCertificates.useGetTotal();

  if (isSuccess) {
    const {total} = data;

    const options = {
      columns: 3,
      spacing: 0,
      height: '40px',
    }

    return(
      <Box marginTop={'10px'} width={'800px'} >
        <Heading display={'flex'} justifyContent={'center'} size={'lg'}>Список регистрационных удостоверений</Heading>

        <Box marginTop={'20px'}>

          <Tooltip padding={'5px'} textAlign={'center'} label='Создать нвоое регистрационное удостоверение'>
            <Button size={'md'} display={'flex'} gap={'20px'} colorScheme="teal" onClick={() => navigate('create', { replace: false })}>
              <Text>Создать</Text> 
              <AddIcon />
            </Button>
          </Tooltip>


          
          
    
          <Box layerStyle={'form'} padding={'10px'}  bg={'white'} marginTop={'10px'} marginX={'auto'} >

            <Box bg={'teal.600'} color={'white'} roundedTopLeft={'md'} roundedTopRight={'md'} minHeight={'30px'}>
              <SimpleGrid paddingY={'5px'} fontWeight={'semibold'} columns={options.columns} spacing={options.spacing}>
                <Box padding={'15px'} display={'flex'} alignItems={'center'} height={options.height}>Торговое наименование</Box>
                <Box padding={'15px'} display={'flex'} alignItems={'center'} height={options.height}>Номер РУ</Box>
                <Box padding={'15px'} display={'flex'} alignItems={'center'} height={options.height}>Дата регистрации РУ</Box>
              </SimpleGrid>
            </Box>
            
            {/* <Box height={'450px'}> */}
            <Box height={`${limit * Number(options.height.split('px')[0]) + (limit * 1)}px`}>
              <RegistrationCertificatesListComponent queryString={`skip=${skip}&limit=${limit}`} options={options} limit={limit}/>
            </Box>
            

            <Box paddingTop={'10px'} borderTop={'1px'} borderColor={'gray.400'}>
              <PaginationComponent limit={limit} setLimit={setLimit} setSkip={setSkip} skip={skip} total={total}/>
            </Box>
            
    
    
          </Box>

        </Box>
  
  
      </Box>
    )
  }

  
}

export default RegistrationCertificatesContainer;