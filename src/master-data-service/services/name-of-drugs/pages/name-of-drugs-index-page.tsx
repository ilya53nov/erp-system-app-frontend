import { Outlet } from "react-router-dom"
import MasterDataNavigation, { masterDataNavigationItems } from "../../../components/master-data-navigation"

const NameOfDrugsIndexPage: React.FC = () => {
  return(
    <>
      <MasterDataNavigation activeItem={masterDataNavigationItems[1]} />
      <Outlet/>
    </>
  )
}

export default NameOfDrugsIndexPage;