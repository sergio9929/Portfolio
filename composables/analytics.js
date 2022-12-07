export const useAnalytics = async () => {
    const config = useRuntimeConfig()
    if (!config.public.isDev) {
        const { getAnalytics, isSupported } = await import("firebase/analytics")
        isSupported().then(data => {
            console.log('Analytics:', data ? '🙉' : '🙈')
            if (data) {
                const app = useFirebase()
                getAnalytics(app)
            }
        })
    }
}