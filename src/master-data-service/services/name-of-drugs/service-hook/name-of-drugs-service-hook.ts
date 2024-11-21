import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataServiceHookInterface } from "../../../../api/interface/data-service-hook-interface";
import { NameOfDrugsBackendType, NameOfDrugsFrontendType } from "../../../types";
import { BASE_URL, ServiceName } from "../../../../api/constants";

export class NameOfDrugsServiceHook implements DataServiceHookInterface<NameOfDrugsFrontendType, NameOfDrugsBackendType> {
  baseUrl: string
  serviceName: string

  constructor(baseUrl = BASE_URL, serviceName = ServiceName.nameOfDrugs) {
    this.baseUrl = baseUrl
    this.serviceName = serviceName
  }

  adaptToClient(data: any): NameOfDrugsFrontendType {
    const adapted = {
      ...data,
      titleRu: data['title_ru'],
      titleEn: data['title_en'],
    }

    delete adapted['title_ru']
    delete adapted['title_en']

    return adapted;
  }

  adaptToServer(data: any): NameOfDrugsBackendType { 
    const adapted = {
      ...data,
      title_ru: data['titleRu'],
      title_en: data['titleEn'],
    }

    delete adapted['titleRu']
    delete adapted['titleEn']

    return adapted;
  }

  useGetAll() {
    return useQuery({
      queryKey: [this.serviceName, 'useGetAll  '],
      queryFn: () => axios.get<NameOfDrugsFrontendType[]>(`${this.baseUrl}/${this.serviceName}/`),
      select: data => data.data.map((item) => this.adaptToClient(item)),    
    })
  }

  useGetById(id: string) {
    return useQuery({
      queryKey: [this.serviceName, id],
      queryFn: () => axios.get<NameOfDrugsBackendType>(`${this.baseUrl}/${this.serviceName}/${id}/`),
        
      select: data => this.adaptToClient(data.data), 
    })
  }

  useCreate() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: [this.serviceName],
      mutationFn: (data: NameOfDrugsFrontendType) => axios.post<NameOfDrugsBackendType>(`${this.baseUrl}/${this.serviceName}/`, this.adaptToServer(data)),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [this.serviceName] })
      },
    })
  }

  useUpdate() {
    const queryClient = useQueryClient();

    type props = {
      data: NameOfDrugsFrontendType,
      id: string,
    }
  
    return useMutation({
      mutationKey: ['updateProduct'],
      mutationFn: ({data, id}: props) => axios.put<NameOfDrugsBackendType>(`${this.baseUrl}/${this.serviceName}/${id}/`, this.adaptToServer(data)),
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