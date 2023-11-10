import axios, { AxiosError, AxiosResponse } from "axios";
import { z } from "zod"


const DataSchema = z.object({

  name: z.string(),
  pets: z.object({
    name: z.string(),
    animal: z.string(),
    isVaccinated: z.boolean()
  }).array()

})

export type Data = z.infer<typeof DataSchema>

const client = axios.create({
    baseURL: "https://demoapi.com/",
})

const fetchClients = async (name: string): Promise<AxiosResponse | null> => {
    try {
      const response = await client.get('https://demoapi.com/api/vet/clients', {params:{
        search:name
      }})
      return response
    } catch (error) {
      return (error as AxiosError).response || null
    }
}

export const validateClientsData = (response: AxiosResponse): Data[] | null => {
    const result = DataSchema.array().safeParse(response.data)
    if (!result.success) {
      return null
    }
    return result.data
}

type Response<Type> =
    | {
    data: Type
    status: number
    success: true
    }
    | {
    status: number
    success: false
}

export const searchClientsData = async (name: string): Promise<Response<Data[]>> => {
  const response = await fetchClients(name)
  if (!response) return { success: false, status: 0 }
  if (response.status !== 200)
    return { success: false, status: response.status }
  const data = validateClientsData(response)
  if (!data) return { success: false, status: response.status }
  return { success: true, status: response.status, data }}