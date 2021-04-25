export const lastNumberCard = (numero: string): string => {
  const splited = numero.split(' ')
  const lastNumbers = splited[3]
  return lastNumbers
}