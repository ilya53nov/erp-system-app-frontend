import { Outlet } from "react-router-dom"
import MasterDataNavigation, { masterDataNavigationItems } from "../../../components/master-data-navigation"

const RegistrationCertificatesIndexPage: React.FC = () => {
  return(
    <>
      <MasterDataNavigation activeItem={masterDataNavigationItems[0]} />
      <Outlet/>
    </>
  )
}

export default RegistrationCertificatesIndexPage;