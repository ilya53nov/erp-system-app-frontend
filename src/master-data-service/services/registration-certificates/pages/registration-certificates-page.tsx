import { useNavigate } from "react-router-dom";
import { Box, Button, Tooltip, Text } from "@chakra-ui/react";
import BreadcrumbComponent from "../../../../components/breadcrumb-component";
import RegistrationCertificatesContainer from "../components/registration-certificates/registration-certificates-container";
import RegistrationCertificatesListHeader from "../components/registration-certificates/registration-certificates-list-header";
import { AddIcon } from "@chakra-ui/icons";

const RegistrationCertificatesPage: React.FC = () => {
  const navigate = useNavigate();

  return(
    <Box display={'flex'} flexDirection={'column'} >
      <Box alignSelf={'flex-start'}>
        <BreadcrumbComponent/>
      </Box>
      
      <Box display={'flex'} justifyContent={'center'}>
        <RegistrationCertificatesContainer/>
      </Box>      
    </Box>    
  )
}

export default RegistrationCertificatesPage;
