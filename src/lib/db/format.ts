import MobileDetect from 'mobile-detect';

export function formatPrices(price:number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price).replace(String.fromCharCode(160), "\u00A0");
}


export function formatPrice(price:number) {
  const md = new MobileDetect(window.navigator.userAgent);
  const formattedPrice = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price);
  
  if (md.mobile()) {
    return formattedPrice.replace(/\s/g, '\u00A0');
  } else {
    return formattedPrice;
  }
}

