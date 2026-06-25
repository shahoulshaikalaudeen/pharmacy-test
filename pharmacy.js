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

    this.updaters = {
      "Herbal Tea": this.updateHerbalTea.bind(this),
      Fervex: this.updateFervex.bind(this),
      Dafalgan: this.updateDafalgan.bind(this),
      "Magic Pill": () => {},
    };
  }

  increaseBenefit(drug, amount = 1) {
    drug.benefit = Math.min(50, drug.benefit + amount);
  }

  decreaseBenefit(drug, amount = 1) {
    drug.benefit = Math.max(0, drug.benefit - amount);
  }

  updateNormalDrug(drug) {
    this.decreaseBenefit(drug, drug.expiresIn <= 0 ? 2 : 1);
  }

  updateDafalgan(drug) {
    this.decreaseBenefit(drug, drug.expiresIn <= 0 ? 4 : 2);
  }

  updateHerbalTea(drug) {
    this.increaseBenefit(drug, drug.expiresIn <= 0 ? 2 : 1);
  }

  updateFervex(drug) {
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

      if (drug.name !== "Magic Pill") {
        drug.expiresIn--;
      }
    });

    return this.drugs;
  }
}