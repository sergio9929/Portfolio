export const useAnalytics = async () => {
    const config = useRuntimeConfig()
    if (!config.public.isDev) {
        const { getAnalytics, isSupported } = await import("firebase/analytics")
        const app = useFirebase()
        isSupported().then(data => {
            console.log('Analytics:', data ? '🙉' : '🙈')
            if (data) {
                getAnalytics(app)
            }
        })
    }
}