export const formatCurrency = (number) => {
  const numb = parseInt(number) ? parseInt(number) : 0;
  return numb.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
  });
};
