export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
    // Associate each drug type with its update strategy.
    // This avoids a long if/else chain and makes adding new drugs easier.
    this.updaters = {
      "Herbal Tea": this.updateHerbalTea.bind(this),
      Fervex: this.updateFervex.bind(this),
      Dafalgan: this.updateDafalgan.bind(this),
      "Magic Pill": () => {},
    };
  }
  // Benefit can never exceed 50.
  increaseBenefit(drug, amount = 1) {
    drug.benefit = Math.min(50, drug.benefit + amount);
  }
   // Benefit can never be negative.
  decreaseBenefit(drug, amount = 1) {
    drug.benefit = Math.max(0, drug.benefit - amount);
  }

  updateNormalDrug(drug) {
    this.decreaseBenefit(drug, drug.expiresIn <= 0 ? 2 : 1);
  }

  updateDafalgan(drug) {
   // Dafalgan degrades twice as fast as normal drugs.
    this.decreaseBenefit(drug, drug.expiresIn <= 0 ? 4 : 2);
  }

  updateHerbalTea(drug) {
    // Herbal Tea becomes more beneficial over time.
    this.increaseBenefit(drug, drug.expiresIn <= 0 ? 2 : 1);
  }

  updateFervex(drug) {
    // Fervex loses all benefit after its expiration date.
    if (drug.expiresIn <= 0) {
      drug.benefit = 0;
      return;
    }

    let increase = 1;

    if (drug.expiresIn <= 10) increase++;
    if (drug.expiresIn <= 5) increase++;

    this.increaseBenefit(drug, increase);
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      const update =
        this.updaters[drug.name] ?? this.updateNormalDrug.bind(this);

      update(drug);
      // Magic Pill never expires.
      if (drug.name !== "Magic Pill") {
        drug.expiresIn--;
      }
    });

    return this.drugs;
  }
}