// ==================== URL DE LA API ====================
// En build de producción usa VITE_QA_API_URL; en desarrollo, VITE_NEST_API_URL (archivo .env).
export const getApiUrl = () => {
    return import.meta.env.PROD ? import.meta.env.VITE_QA_API_URL : import.meta.env.VITE_NEST_API_URL;
}