export const statusMensage = (status: string) => {
  const mensages = {
    '1011': 'Cartão inválido.'
  }
  return mensages[status] || `${status} - Falha na transação`
}