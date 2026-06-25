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
  }

  increaseBenefit(drug, amount = 1) {
    drug.benefit = Math.min(50, drug.benefit + amount);
  }

  decreaseBenefit(drug, amount = 1) {
    drug.benefit = Math.max(0, drug.benefit - amount);
  }

  updateNormalDrug(drug) {
    this.decreaseBenefit(drug, 1);

    if (drug.expiresIn <= 0) {
      this.decreaseBenefit(drug, 1);
    }
  }

  updateDafalgan(drug) {
    this.decreaseBenefit(drug, 2);

    if (drug.expiresIn <= 0) {
      this.decreaseBenefit(drug, 2);
    }
  }

  updateHerbalTea(drug) {
    this.increaseBenefit(
      drug,
      drug.expiresIn <= 0 ? 2 : 1
    );
  }

  updateFervex(drug) {
    if (drug.expiresIn <= 0) {
      drug.benefit = 0;
      return;
    }

    let increase = 1;

    if (drug.expiresIn <= 10) {
      increase += 1;
    }

    if (drug.expiresIn <= 5) {
      increase += 1;
    }

    this.increaseBenefit(drug, increase);
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      if (drug.name === "Magic Pill") {
        return;
      }

      if (drug.name === "Herbal Tea") {
        this.updateHerbalTea(drug);
      } else if (drug.name === "Fervex") {
        this.updateFervex(drug);
      } else if (drug.name === "Dafalgan") {
        this.updateDafalgan(drug);
      } else {
        this.updateNormalDrug(drug);
      }

      drug.expiresIn--;
    });

    return this.drugs;
  }
}