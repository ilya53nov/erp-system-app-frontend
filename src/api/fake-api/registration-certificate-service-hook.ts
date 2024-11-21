import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RegistrationCertificatesBackendType, RegistrationCertificatesFrontendType } from "../../master-data-service/types";
import { v4 as uuidv4 } from "uuid";
import { RegistrationCertificateServiceHook } from "../../master-data-service/services/registration-certificates/service-hook/registration-certificate-service-hook";


export class FakeRegistrationCertificateServiceHook extends RegistrationCertificateServiceHook {
  useGetTotal() {
    return useQuery({
      queryKey: [this.serviceName, 'useGetTotal'],
      queryFn: () => axios.get<RegistrationCertificatesBackendType[]>(`${this.baseUrl}/${this.serviceName}`),
      select: data => {
        return ({
          ...data.data,          
          total: data.data.length,
        })
      },  
    })
  }

  useGetAll(queryString?: string) {
    const splittedQueryString = queryString?.split('&');

    const queryStringObject: any = {};

    splittedQueryString?.forEach((row) => { 
      const splittedRow = row.split('=');
      queryStringObject[splittedRow[0]] = splittedRow[1];
    })

    return useQuery({
      queryKey: [this.serviceName, 'useGetAll', queryString],
      queryFn: () => axios.get<RegistrationCertificatesBackendType[]>(`${this.baseUrl}/${this.serviceName}`),
      select: data => {
        return ({
          ...data.data,
          data: data.data.map((item) => this.adaptToClient(item)).slice(queryStringObject.skip, Number(queryStringObject.skip) + Number(queryStringObject.limit)),
          total: data.data.length
        })
      },  
    })
  }


  useCreate() {
    const queryClient = useQueryClient();
    const id = uuidv4();

    return useMutation({
      mutationKey: [this.serviceName],
      mutationFn: (data: RegistrationCertificatesFrontendType) => axios.post<RegistrationCertificatesBackendType>(`${this.baseUrl}/${this.serviceName}/`, this.adaptToServer({...data, id: id})),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [this.serviceName] })
      },
    })
  }
}
