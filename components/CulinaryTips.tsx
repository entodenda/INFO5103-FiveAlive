export class CulinaryTip {
  tip: String;

  public constructor(tip: string) {
    this.tip = tip;
  }
}

export async function CulinaryTipImport(): Promise<CulinaryTip[]> {
  try {
    const tips: CulinaryTip[] = [];

    let tipfile = require("../assets/tips.json");
    tipfile.forEach((t: { tip: string }) => {
      tips.push(new CulinaryTip(t.tip));
    });
    console.log(tips);
    return tips;
  } catch (error) {
    console.error("Error loading culinary tips:", error);
    return [];
  }
}
