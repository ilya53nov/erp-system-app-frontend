import { Box, SimpleGrid } from "@chakra-ui/react";

type RegistrationCertificatesListHeaderProps = {
  options: any,
}

const RegistrationCertificatesListHeader: React.FC<RegistrationCertificatesListHeaderProps> = ({options}) => {
  return(
    <SimpleGrid fontWeight={'semibold'} columns={options.columns} spacing={options.spacing}>
      <Box display={'flex'} alignItems={'center'} height={options.height}>Торговое наименование</Box>
      <Box display={'flex'} alignItems={'center'} height={options.height}>Номер РУ</Box>
      <Box display={'flex'} alignItems={'center'} height={options.height}>Дата регистрации РУ</Box>
    </SimpleGrid>
  )
}

export default RegistrationCertificatesListHeader;
