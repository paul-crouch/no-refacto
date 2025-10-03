export class TakeHomeCalculator {
  private readonly percent: number;

  constructor(percent: number) {
    this.percent = percent;
  }

  netAmount(...inputs: Pair<number, string>[]): Pair<number, string> {
    const currencyAmounts: Pair<number, string>[] = Array.from(inputs);

    const total = currencyAmounts.reduce(
      (acc, curr) => {
        if (acc.currencyCode !== curr.currencyCode) {
          throw new Incalculable();
        }
        return new Pair<number, string>(
          acc.currencyValue + curr.currencyValue,
          acc.currencyCode,
        );
      },
      new Pair<number, string>(0, currencyAmounts[0].currencyCode),
    );

    const tax = new Pair<number, string>(
      total.currencyValue * (this.percent / 100),
      total.currencyCode,
    );

    return new Pair<number, string>(
      total.currencyValue - tax.currencyValue,
      total.currencyCode,
    );
  }
}

export class Pair<A, B> {
  currencyValue: A;
  currencyCode: B;

  constructor(currencyValue: A, currencyCode: B) {
    this.currencyValue = currencyValue;
    this.currencyCode = currencyCode;
  }
}

export class Incalculable extends Error {}
