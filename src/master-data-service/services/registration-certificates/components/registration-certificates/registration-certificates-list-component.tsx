import { Box, Divider, SimpleGrid } from "@chakra-ui/react";
import dayjs from "dayjs";
import { ServicesApi } from "../../../../../api/constants";
import { useNavigate } from "react-router-dom";
import { RegistrationCertificatesFrontendType } from "../../../../types";

type RegistrationCertificatesComponentProps = {
  options: any,
  //data: RegistrationCertificatesFrontendType[],
  limit: number,
  queryString: string,
}

const RegistrationCertificatesListComponent: React.FC<RegistrationCertificatesComponentProps> = ({options, queryString, limit}) => {
  //const {data: result, isLoading, isSuccess, isError, error} = ServicesApi.registrationCertificates.useGetAll(`skip=${skip}`);
  const {data: result, isLoading, isSuccess, isError, error} = ServicesApi.registrationCertificates.useGetAll( `${queryString}`);

  const navigate = useNavigate();

  const navigateToRegistrationSertificateById = (id:string) => {
    navigate(id);
  }

   if (isSuccess) {
    const {data} = result;

    //console.log(limit * Number(options.height.split('px')[0]))


    return(
      <Box>
        {data.map((item) => {
          return(
            <Box onClick={() => navigateToRegistrationSertificateById(item.id!)} key={item.id} _hover={{ bg: "gray.100", cursor: "pointer", transition: 'background-color 0.2s'}}>
              <Divider />

              <SimpleGrid columns={options.columns} spacing={options.spacing}>            
                <Box padding={'15px'} display={'flex'} alignItems={'center'} height={options.height}>{item.tradeName}</Box>
                <Box padding={'15px'} display={'flex'} alignItems={'center'} height={options.height}>{item.regCertNumber}</Box>
                <Box padding={'15px'} display={'flex'} alignItems={'center'} height={options.height}>{dayjs(item.createAtRegCer).format('DD.MM.YYYY')}</Box>              
              </SimpleGrid>
            </Box>
          )
        })}
      </Box> 
    )
  }


}

export default RegistrationCertificatesListComponent;