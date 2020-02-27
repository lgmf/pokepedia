import damageLabelFilter from "@/views/effectiveness/filters/DamageLabel";

describe("DamageLabelFilter", () => {
  it("happy path", () => {
    expect(damageLabelFilter("quad")).toEqual("4×");
    expect(damageLabelFilter("double")).toEqual("2×");
    expect(damageLabelFilter("regular")).toEqual("1×");
    expect(damageLabelFilter("half")).toEqual("½×");
    expect(damageLabelFilter("quarter")).toEqual("¼×");
    expect(damageLabelFilter("zero")).toEqual("0×");
  });

  it("should throw an Error when there is an invalid option", () => {
    const invalidOption = "invalid";
    try {
      (<any>damageLabelFilter)(invalidOption);
    } catch (error) {
      expect(error.message).toEqual(`option ${invalidOption} for damage label filter not found`);
    }
  });
});
