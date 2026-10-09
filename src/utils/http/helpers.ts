// ==================== CONSTRUCCIÓN DE QUERY STRING ====================
// Convierte un objeto en '?a=1&b=2'; los arreglos se envían separados por comas.
export const buildQueryString = (params: any = {}) => {
  if (Object.keys(params).length === 0) {
    return "";
  }
  return (
    "?" +
    Object.entries(params)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          // Convierte los arrays a cadenas separadas por comas
          return `${key}=${value.join(",")}`;
        }
        // Convierte otros valores a string
        //@ts-ignore
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join("&")
  );
};
