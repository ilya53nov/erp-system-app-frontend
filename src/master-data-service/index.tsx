import React, { useState } from "react";
import MasterDataNavigation, { masterDataNavigationItems, NavigationPath } from "./components/master-data-navigation";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Card } from "@chakra-ui/react";

type TestCardNavProps = {
  activeItemNavigation: NavigationPath,
  handleClick(item: NavigationPath): void
}

const TestCardNav: React.FC<TestCardNavProps> = ({activeItemNavigation, handleClick}) => {
  

  return(
    <>
      {masterDataNavigationItems.map((item) => {
        return(
          <Card key={item.title} color={item.title === activeItemNavigation.title ? 'red' : 'black'} onClick={() => handleClick(item)}>{item.title}</Card>
        )
      })}
    </>
  )
}

const MasterDataService: React.FC = () => {
  const location = useLocation();

  console.log(location.pathname);

  const navigate = useNavigate();
  const [activeItemNavigation, setActiveItemNavigation] = useState({} as NavigationPath);

  const handleClick = (item: typeof masterDataNavigationItems[number]) => {
    setActiveItemNavigation(item);
    navigate(item.path);
  }
 
  return(
    <div>
      {location.pathname === '/master-data' ? <TestCardNav activeItemNavigation={activeItemNavigation} handleClick={handleClick}/> : <MasterDataNavigation activeItem={activeItemNavigation}/>} 
      {/* <Outlet /> */}
    </div>
  )
}

export default MasterDataService;