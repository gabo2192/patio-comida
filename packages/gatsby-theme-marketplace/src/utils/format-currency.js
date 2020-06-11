export const formatCurrency = (number) => {
  return new Number(number).toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
  });
};
