import axios, { AxiosError, AxiosResponse } from "axios";
import { z } from "zod"

const PetSchema = z.object({
    name: z.string(),
    animal: z.string(),
    isVaccinated: z.boolean()
})

const DataSchema = z.object({
    
  name: z.string(),
  pets: PetSchema.array()

})

export type Data = z.infer<typeof DataSchema>

const client = axios.create({
    baseURL: "https://demoapi.com",
})

const getVets = async (search?: string): Promise<AxiosResponse | null> => {
    try {
      const params = search ? { search } : { }
      const response = await client.get(`/api/vet/clients`, {params})
      return response
    } catch (error) {
      return (error as AxiosError).response || null
    }
}

export const validateVets = (response: AxiosResponse): Data[] | null => {
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

  export const loadVetsNow = async (search?: string): Promise<Response<Data[]>> => {
    const response = await getVets(search)
    if (!response) return { success: false, status: 0 }
    if (response.status !== 200)
      return { success: false, status: response.status }
    const data = validateVets(response)
    if (!data) return { success: false, status: response.status }
    return { success: true, status: response.status, data }
  }