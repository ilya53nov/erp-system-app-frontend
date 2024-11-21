import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataServiceHookInterface } from "../../../../api/interface/data-service-hook-interface";
import { RegistrationCertificatesBackendType, RegistrationCertificatesFrontendType } from "../../../types";
import { BASE_URL, ServiceName } from "../../../../api/constants";

export class RegistrationCertificateServiceHook implements DataServiceHookInterface<RegistrationCertificatesFrontendType, RegistrationCertificatesBackendType> {
  baseUrl: string
  serviceName: string

  constructor(baseUrl = BASE_URL, serviceName = ServiceName.registrationCrtificates) {
    this.baseUrl = baseUrl
    this.serviceName = serviceName
  }

  adaptToClient(data: any): RegistrationCertificatesFrontendType {
    const adapted = {
      ...data,
      tradeName: data['trade_Name'],
      regCertNumber: data['reg_Cert_Number'],
      createAtRegCer: data['createAt_Reg_Cer'],
    }

    delete adapted['trade_Name']
    delete adapted['reg_Cert_Number']
    delete adapted['createAt_Reg_Cer']

    return adapted;
  }

  adaptToServer(data: any): RegistrationCertificatesBackendType { 
    const adapted = {
      ...data,
      trade_Name: data['tradeName'],
      reg_Cert_Number: data['regCertNumber'],
      createAt_Reg_Cer: data['createAtRegCer'],
    }

    delete adapted['tradeName']
    delete adapted['regCertNumber']
    delete adapted['createAtRegCer']

    return adapted;
  }

  useGetTotal() {
    return useQuery({
      queryKey: [this.serviceName, 'useGetTotal'],
      queryFn: () => axios.get<RegistrationCertificatesBackendType[]>(`${this.baseUrl}/${this.serviceName}/`),
      select: data => {
        return ({
          ...data.data,          
          total: data.data.length,
        })
      },  
    })  
  }

  useGetAll(queryString?: string) {
    type useGetAllType = {
      data: RegistrationCertificatesBackendType[],
      total: number,
    }

    return useQuery({
      queryKey: [this.serviceName, 'useGetAll', queryString],
      queryFn: () => axios.get<useGetAllType>(`${this.baseUrl}/${this.serviceName}/${queryString ? `?${queryString}` : ''}`),
      select: data => ({...data.data, data: data.data.data.map((item) => this.adaptToClient(item))}),    
    })
  }

  useGetActual() {
    return useQuery({
      queryKey: [this.serviceName, 'useGetActual'],
      queryFn: () => axios.get<RegistrationCertificatesFrontendType[]>(`${this.baseUrl}/${this.serviceName}/?is_active=true`),
      select: data => data.data.map((item) => this.adaptToClient(item)),
    })
  }

  useGetArchive() {
    return useQuery({
      queryKey: [this.serviceName, 'useGetArchive'],
      queryFn: () => axios.get<RegistrationCertificatesFrontendType[]>(`${this.baseUrl}/${this.serviceName}/?is_active=false`),
      select: data => data.data.map((item) => this.adaptToClient(item)),    
    })
  }

  useGetById(id: string) {
    return useQuery({
      queryKey: [this.serviceName, id],
      queryFn: () => axios.get<RegistrationCertificatesBackendType>(`${this.baseUrl}/${this.serviceName}/${id}/`),
        
      select: data => this.adaptToClient(data.data), 
    })
  }

  useCreate() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: [this.serviceName],
      mutationFn: (data: RegistrationCertificatesFrontendType) => axios.post<RegistrationCertificatesBackendType>(`${this.baseUrl}/${this.serviceName}/`, this.adaptToServer(data)),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [this.serviceName] })
      },
    })
  }

  useUpdate() {
    const queryClient = useQueryClient();

    type props = {
      data: RegistrationCertificatesFrontendType,
      id: string,
    }
  
    return useMutation({
      mutationKey: ['updateProduct'],
      mutationFn: ({data, id}: props) => axios.put<RegistrationCertificatesBackendType>(`${this.baseUrl}/${this.serviceName}/${id}/`, this.adaptToServer(data)),
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({ queryKey: [this.serviceName, data.data.id] })
        //queryClient.invalidateQueries({ queryKey: [this.serviceName] })
      },    
    })
  }

  useDelete() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: [this.serviceName],
      mutationFn: (id: string) => axios.delete(`${this.baseUrl}/${this.serviceName}/${id}/`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [this.serviceName] })
      },
    })
  }
}