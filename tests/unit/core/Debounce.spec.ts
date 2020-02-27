import Debounce from "@/core/decorators/Debounce";

const debounceTime = 500;

let result: string;

class Mock {
  @Debounce(debounceTime)
  delayedFunction() {
    result = "executed";
  }
}

describe("Debounce", () => {
  let mock;

  beforeEach(() => {
    mock = new Mock();
    mock.delayedFunction();
  });

  it("should not update the state yet", (done) => {
    const lessThanDebounceTime = debounceTime / 2;
    setTimeout(() => {
      expect(result).toBeUndefined();
      done();
    }, lessThanDebounceTime);
  });

  it("should delay the execution of a method in 'x' time", (done) => {
    setTimeout(() => {
      expect(result).toEqual("executed");
      done();
    }, debounceTime);
  });
});
