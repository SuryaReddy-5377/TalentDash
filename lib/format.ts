export function formatCurrency(amount: number, currency: string): string {
  // Handle invalid values
  if (!amount || isNaN(amount)) {
    return currency === 'INR' ? '₹0' : '$0';
  }
  
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US')}`;
  }
  if (currency === 'GBP') {
    return `£${amount.toLocaleString('en-GB')}`;
  }
  if (currency === 'EUR') {
    return `€${amount.toLocaleString('de-DE')}`;
  }
  // INR
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}