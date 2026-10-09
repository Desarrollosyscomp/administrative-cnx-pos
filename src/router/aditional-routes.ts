// ==================== RUTAS ADICIONALES ====================
// Rutas privadas que no dependen de permisos de módulo y rutas solo para invitados (login).
export const additionalPrivateRoutes = [
  { path: "/" },
  { path: "/unauthorized" },
  { path: "/profile" },
  { path: "/admin/dashboard" },
];
export const notAuthRoutes = [{ path: "/login", type: "only-guest" }];
