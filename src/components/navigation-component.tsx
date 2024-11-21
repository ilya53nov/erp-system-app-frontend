import { useState } from "react";
import { RoutePath } from "../constants";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigationItems = [
    {
      title: 'master data',
      path: `${RoutePath.index.path}${RoutePath.masterData.path}`
    },
    {
      title: 'test',
      path: `${RoutePath.index.path}test`
    }
  ]

  const navigate = useNavigate();

  const [activeNavigationItem, setActiveNavigationItem] = useState(navigationItems[0]);

  const handleClick = (item: typeof navigationItems[number]) => {
    if (item.title !== activeNavigationItem.title) {
      setActiveNavigationItem(item)
      navigate(item.path);
    }
  }

  return(
    <UnorderedList>
      {navigationItems.map((item) => {
        return(
          <ListItem cursor={'pointer'} key={item.title} color={item.title === activeNavigationItem.title ? 'red' : 'black'} onClick={() => handleClick(item)}>{item.title}</ListItem>
        )
      })}
    </UnorderedList>
  )
}

export default Navigation;
