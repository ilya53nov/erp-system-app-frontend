import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePath } from "../constants";

type BreadcrumbComponentItemProps = {
  item: string,
  isCurrentPage: boolean,
  path: string,
}

const BreadcrumbItemComponent: React.FC<BreadcrumbComponentItemProps> = (props) => {  
  const navigate = useNavigate();

  const handleClick = () => {
    if (!props.isCurrentPage) {
      navigate(`/${props.path}`)
    }
  }

  return(
    <BreadcrumbItem {...props} isCurrentPage={props.isCurrentPage}>
      <BreadcrumbLink onClick={handleClick}>{props.item}</BreadcrumbLink>
    </BreadcrumbItem>
  )
}

type BreadcrumbComponentType = {
  lastItemDescription?: string,
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentType> = ({lastItemDescription}) => {
  const splittedPath = useLocation().pathname.split('/').slice(1);

  return(
    <Breadcrumb marginY={'25px'} spacing='8px' separator={<ChevronRightIcon color='gray.500' />} >
      {splittedPath.map((item, index) => {
        const path = splittedPath.slice(0, index + 1).join('/');
        const filteredItem = Object.values(RoutePath).filter((value) => value.path === item)[0];
        
        let description: string = '';

        if (filteredItem) {
          description = filteredItem.description;
        }
        
        if (!filteredItem && lastItemDescription) {
          description = lastItemDescription;
        }

        if (!filteredItem && !lastItemDescription) {
          description = item;
        }

        return(
          <BreadcrumbItemComponent key={item} item={description} path={path} isCurrentPage={index === splittedPath.length - 1}/>
        )       
      })}
    </Breadcrumb>
  )
}

export default BreadcrumbComponent;