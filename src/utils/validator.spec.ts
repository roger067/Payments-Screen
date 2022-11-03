import {
  isCVVInvalid,
  isCardNumberInvalid,
  isExpiryInvalid,
  luhnCheck,
} from "./validator";

describe("Test credit card form validators", () => {
  const cvv = "123";
  const cardNumber = "4111111111111111";
  const expiry = "06/32";
  const invalidCardNumber = "1234123412341234";
  const invalidCVV = "12";
  const invalidExpiry = "00/01aaaa";

  it("Should test card number validator", () => {
    expect(isCardNumberInvalid(cardNumber)).toBe(false);
    expect(isCardNumberInvalid("3244a")).toBe(true);
  });
  it("Should test expiry validator", () => {
    expect(isExpiryInvalid(expiry)).toBe(false);
    expect(isExpiryInvalid(invalidExpiry)).toBe(true);
  });
  it("Should test cvv validator", () => {
    expect(isCVVInvalid(cvv)).toBe(false);
    expect(isCVVInvalid(invalidCVV)).toBe(true);
  });
  it("Should test luhn algorithm validator", () => {
    expect(luhnCheck(cardNumber)).toBe(true);
    expect(luhnCheck(invalidCardNumber)).toBe(false);
  });
});
