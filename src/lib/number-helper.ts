
export const formatNumber = (value?: number) => {
  if (!value) {
    return "";
  }
  return new Intl.NumberFormat('sv-SE', { maximumSignificantDigits: 5 }).format(value);
}