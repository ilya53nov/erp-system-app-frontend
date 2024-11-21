import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NameOfDrugsBackendType, NameOfDrugsFrontendType } from "../../master-data-service/types";
import { v4 as uuidv4 } from "uuid";
import { NameOfDrugsServiceHook } from "../../master-data-service/services/name-of-drugs/service-hook/name-of-drugs-service-hook";


export class FakeNameOfDrugsServiceHook extends NameOfDrugsServiceHook {
  useCreate() {
    const queryClient = useQueryClient();
    const id = uuidv4();

    return useMutation({
      mutationKey: [this.serviceName],
      mutationFn: (data: NameOfDrugsFrontendType) => axios.post<NameOfDrugsBackendType>(`${this.baseUrl}/${this.serviceName}/`, this.adaptToServer({...data, id: id})),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [this.serviceName] })
      },
    })
  }
}