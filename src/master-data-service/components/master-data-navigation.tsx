import { useLocation, useNavigate } from "react-router-dom";
import { RoutePath } from "../../constants";
import { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

export type NavigationPath = {
  title: string,
  path: string,
}

type MasterDataNavigationProps = {
  activeItem: NavigationPath,
}


export const masterDataNavigationItems: NavigationPath[] = [
  {
    title: 'Регистрационное удостоверение',
    path: `${RoutePath.index.path}${RoutePath.masterData.path}/${RoutePath.registrationCertificate.path}`,
  },
  {
    title: 'Наименование препарата',
    path: `${RoutePath.index.path}${RoutePath.masterData.path}/${RoutePath.nameOfDrugs.path}`,
  },
]

const MasterDataNavigation: React.FC<MasterDataNavigationProps> = ({activeItem}) => {
  const navigate = useNavigate();
  const [activeItemNavigation, setActiveItemNavigation] = useState(activeItem ?? masterDataNavigationItems[0]);

  const handleClick = (item: typeof masterDataNavigationItems[number]) => {
    setActiveItemNavigation(item);
    navigate(item.path);
  }

  return(
    <Flex
      
      direction={'row'}
      flexWrap={'wrap'}
      //gap={'5px'}
      justifyContent={'center'}
      //marginTop={'5px'}
      >
      {masterDataNavigationItems.map((item) => {
        const isActive = item.title === activeItemNavigation.title;

        const style = {
          _hover: isActive ? {} : {color: 'teal.600', transition: "color 0.4s ease-in-out"},
          color: isActive ? 'teal.800' : 'gray.400',
          borderBottomColor: isActive ? 'teal.800' : 'gray.100',
        }

        return(
          <Box          
          as="button"
          key={item.title}
          padding={'8px'}
          borderBottom={'4px'}
          //borderBottom={item.title === activeItemNavigation.title ? '1px' : '2px'}
          //borderBottomColor={'gray.100'}
          //bg={'teal.700'}
          //_hover={item.title !== activeItemNavigation.title ? {borderBottomColor: 'cyan.900', color: 'cyan.900'} : {}}
          _hover={style._hover}
          // cursor={'pointer'}
          color={style.color}
          //color={'teal.800'}
          borderBottomColor={style.borderBottomColor}
          boxSizing="border-box"
          onClick={() => handleClick(item)}>
            <Text textTransform={'uppercase'}
            //fontWeight={item.title === activeItemNavigation.title ? 'medium' : 'hairline'}
            fontWeight={'600'}
            fontSize={'sm'}>
            {item.title}
            </Text>
          </Box>

          // <Box key={item.title} layerStyle={'secondaryNavigation'}>
          //   {item.title}
          // </Box>


        )
      })}
    </Flex>
  )
}

export default MasterDataNavigation;
