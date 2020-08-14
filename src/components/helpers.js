// mottar telefonnummer fra skjema, og formaterer nummeret i korrekt format
// returnerer korrekt format, alt ettersom det er mobil eller fastnummer
export const formatPhoneNumber = (formNumber) => {
  const cleaned = (`${formNumber}`).replace(/\D/g, '');
  if (cleaned[0] === '9' || cleaned[0] === '4') {
    const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})$/);
    if (match) return `${match[1]} ${match[2]} ${match[3]}`;
  } else {
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (match) return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }
};

// Mottar epost fra skjema, sjekker at den inneholder et normalt emailformat.
// hvis epost ok, returneres den tilbake
export const validateEmail = (email) => {
  const term = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return term.test(String(email).toLowerCase());
};

// Mottar postnummer fra skjema, sjekke at postnummeret har korrekt lengde
// hvis postnummer ok, returneres det tilbake
export const checkAreaCode = (areaCode) => {
  if (areaCode.length === 4) return true;

  return false;
};

// Setter korrekte headers for post request
export const postConfig = {
  headers: {
    Accept: 'application/x-www-form-urlencoded',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
export default formatPhoneNumber;