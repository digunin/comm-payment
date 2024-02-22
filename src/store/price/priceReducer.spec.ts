import {
  isNonzeroPrice,
  isDifferentPrices,
  isPriceInArray,
  Price,
} from "./priceReducer";

export const oldPrices: Array<Price> = [
  { cold: 0, hot: 1, electricity: 1, waterWaste: 1 },
  { cold: 2, hot: 2, electricity: 0, waterWaste: 2 },
  { cold: 3, hot: 0, electricity: 1, waterWaste: 0 },
  { cold: 3, hot: 4, electricity: 5, waterWaste: 6 },
  { cold: 5, hot: 6, electricity: 7, waterWaste: 8 },
  { cold: 9, hot: 9, electricity: 9, waterWaste: 0 },
];

describe("priceReducer utility function testing", () => {
  test("price is zero if one or more value == 0", () => {
    let result: Array<boolean> = oldPrices.map((price) => {
      return isNonzeroPrice(price) ? true : false;
    });
    expect(result).toStrictEqual([false, false, false, true, true, false]);
  });
  test("price is different if atleast one property don't match", () => {
    expect(
      isDifferentPrices(oldPrices[5], {
        cold: 9,
        hot: 9,
        electricity: 9,
        waterWaste: 0,
      })
    ).toBe(false);
    expect(isDifferentPrices(oldPrices[0], oldPrices[1])).toBe(true);
  });
  test("price in array", () => {
    expect(
      isPriceInArray(oldPrices, {
        cold: 5,
        hot: 6,
        electricity: 7,
        waterWaste: 8,
      })
    ).toBe(true);
    expect(
      isPriceInArray(oldPrices, {
        cold: 5,
        hot: 6,
        electricity: 7,
        waterWaste: 1,
      })
    ).toBe(false);
    expect(
      isPriceInArray(oldPrices, {
        cold: 0,
        hot: 0,
        electricity: 0,
        waterWaste: 0,
      })
    ).toBe(false);
  });
});
