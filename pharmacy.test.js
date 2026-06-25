import { Drug, Pharmacy } from "../pharmacy";

describe("Pharmacy", () => {
  test("normal drug decreases by 1 before expiration", () => {
    const pharmacy = new Pharmacy([
      new Drug("Doliprane", 10, 20),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(19);
    expect(pharmacy.drugs[0].expiresIn).toBe(9);
  });

  test("normal drug decreases by 2 after expiration", () => {
    const pharmacy = new Pharmacy([
      new Drug("Doliprane", 0, 20),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(18);
    expect(pharmacy.drugs[0].expiresIn).toBe(-1);
  });

  test("benefit never goes below 0", () => {
    const pharmacy = new Pharmacy([
      new Drug("Doliprane", 5, 0),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(0);
  });

  test("Herbal Tea increases benefit", () => {
    const pharmacy = new Pharmacy([
      new Drug("Herbal Tea", 10, 20),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(21);
  });

  test("expired Herbal Tea increases benefit by 2", () => {
    const pharmacy = new Pharmacy([
      new Drug("Herbal Tea", 0, 20),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(22);
  });

  test("Herbal Tea benefit never exceeds 50", () => {
    const pharmacy = new Pharmacy([
      new Drug("Herbal Tea", 10, 50),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(50);
  });

  test("Magic Pill never changes", () => {
    const pharmacy = new Pharmacy([
      new Drug("Magic Pill", 10, 40),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(40);
    expect(pharmacy.drugs[0].expiresIn).toBe(10);
  });

  test("Fervex increases by 1 when more than 10 days remain", () => {
    const pharmacy = new Pharmacy([
      new Drug("Fervex", 12, 20),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(21);
  });

  test("Fervex increases by 2 when 10 days or less remain", () => {
    const pharmacy = new Pharmacy([
      new Drug("Fervex", 10, 20),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(22);
  });

  test("Fervex increases by 3 when 5 days or less remain", () => {
    const pharmacy = new Pharmacy([
      new Drug("Fervex", 5, 20),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(23);
  });

  test("Fervex drops to 0 after expiration", () => {
    const pharmacy = new Pharmacy([
      new Drug("Fervex", 0, 20),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(0);
  });

  test("Dafalgan decreases by 2 before expiration", () => {
    const pharmacy = new Pharmacy([
      new Drug("Dafalgan", 10, 20),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(18);
    expect(pharmacy.drugs[0].expiresIn).toBe(9);
  });

  test("Dafalgan decreases by 4 after expiration", () => {
    const pharmacy = new Pharmacy([
      new Drug("Dafalgan", 0, 20),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(16);
    expect(pharmacy.drugs[0].expiresIn).toBe(-1);
  });

  test("Dafalgan benefit never goes below 0", () => {
    const pharmacy = new Pharmacy([
      new Drug("Dafalgan", 0, 2),
    ]);

    pharmacy.updateBenefitValue();

    expect(pharmacy.drugs[0].benefit).toBe(0);
  });
});