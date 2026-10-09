// ==================== INTERFACES DEL CLIENTE HTTP ====================
// Mensajes personalizados por código y códigos excluidos de notificación.
export interface HttpErrors {
  code: number;
  message: string;
}
export interface HttpErrorsAndExceptions {
  exceptions: Array<number>;
  httpErrors?: Array<HttpErrors>;
}
