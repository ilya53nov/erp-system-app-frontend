import { Box } from "@chakra-ui/react";
import { ServicesApi } from "../../../../api/constants";
import BreadcrumbComponent from "../../../../components/breadcrumb-component";
import MasterDataNavigation from "../../../components/master-data-navigation";

const NameOfDrugsPage: React.FC =() => {
  const {data, isSuccess, isLoading, isError, error} = ServicesApi.nameOfDrugs.useGetAll();

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>

  if (isSuccess) {
    return(
      <Box>
        <BreadcrumbComponent/>
        {data.map((item) => {
          return(
            <Box key={item.id}>
              <Box>
                <Box>{item.titleRu}</Box>
              </Box>
              <Box>
                <Box>{item.titleEn}</Box>
              </Box>
            </Box>
          )
        })}
      </Box>
    )
  }
}

export default NameOfDrugsPage;