export const isExpiryInvalid = (expiry: string) => {
  const month = parseInt(expiry.split("/")[0]);
  const year = parseInt(expiry.split("/")[1]);

  const currentYear = parseInt(new Date().getFullYear().toString().slice(-2));

  return month < 1 || month > 12 || year < currentYear;
};

export const isCardNumberInvalid = (cardNumber: string) => {
  const cardWithoutFormat = cardNumber.split(" ").join("");

  const regex = new RegExp("^[0-9]{13,19}$");
  if (!regex.test(cardWithoutFormat)) {
    return true;
  }

  return !luhnCheck(cardWithoutFormat);
};

export const luhnCheck = (value: string) => {
  let checksum = 0;
  let j = 1;

  for (let i = value.length - 1; i >= 0; i--) {
    let calc = 0;

    calc = Number(value.charAt(i)) * j;

    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }

    checksum = checksum + calc;

    if (j === 1) {
      j = 2;
    } else {
      j = 1;
    }
  }

  return checksum % 10 === 0;
};

export const isCVVInvalid = (cvv: string) => {
  return !/^\d{3}$/.test(cvv);
};
