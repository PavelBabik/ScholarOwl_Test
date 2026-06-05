export const useApi = () => {
    const config = useRuntimeConfig()

    return $fetch.create({
        baseURL: String(config.public.apiUrl)
    })
}