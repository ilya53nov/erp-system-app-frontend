export interface DataServiceHookInterface<T, B> {
  useGetAll(queryString?: string): void,
  useGetById(id: string): void,
  useCreate(data: T): void,
  useUpdate(): void,
  useDelete?(id: string): void,
  adaptToClient(data: B): T,
  adaptToServer(data: T): B,
}
