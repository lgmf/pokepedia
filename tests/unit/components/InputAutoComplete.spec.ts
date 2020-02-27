import { shallowMount, Wrapper } from "@vue/test-utils";

import InputAutoComplete from "@/components/InputAutoComplete.vue";

import mockSuggestions from "../mocks/pokemon-suggestions.mock";

describe("InputAutoComplete", () => {
  const propsData = {
    label: "search here",
    suggestions: [],
    loading: false
  };

  let component: Wrapper<InputAutoComplete>;

  beforeEach(() => {
    component = shallowMount(InputAutoComplete, {
      propsData
    });
  });

  it("should render the label", () => {
    const label = component.find(".label");
    expect(label.text()).toEqual(propsData.label);
  });

  it("should set the for attribute on the label equal to the input id", () => {
    const label = component.find(".label");
    const input = component.find(".input");
    expect(label.attributes("for")).toEqual(input.attributes("id"));
  });

  it("should have a search icon", () => {
    const searchIcon = component.find(".icon.-search");
    expect(searchIcon.exists()).toBeTruthy();
  });

  it("should hide the loading icon", () => {
    const loadingIcon = component.find(".icon.-loading");
    expect(loadingIcon.attributes("style")).toContain("display: none");
  });


  describe("input events", () => {
    const inputValue = "pikachu";

    let input: Wrapper<any>;

    let inputElement: HTMLInputElement;

    beforeEach(() => {
      input = component.find(".input");
      inputElement = input.element as HTMLInputElement;
      inputElement.value = inputValue;
    });

    it("should emit the input value when the user types", (done) => {
      const debounceTime = 500;

      input.trigger("keyup");

      setTimeout(async () => {
        await component.vm.$nextTick();

        const [[onTypeEventValue]] = component.emitted("on-type");
        expect(onTypeEventValue).toEqual(inputValue);

        done();
      }, debounceTime);
    });

    it("should emit the selected option when a suggestion is selected", async () => {
      input.trigger("change");

      await component.vm.$nextTick();

      const [[onOptionSelectedEventValue]] = component.emitted("on-option-selected");
      expect(onOptionSelectedEventValue).toEqual({ search: inputValue });
    });
  });

  describe("when the loading is set", () => {
    beforeEach(() => {
      component.setProps({ loading: true });
    });

    it("should show the loading icon", () => {
      const loadingIcon = component.find(".icon.-loading");
      expect(loadingIcon.attributes("style")).not.toContain("display: none");
    });
  });

  describe("when there are suggestions", () => {
    let suggestionBox: Wrapper<any>;

    beforeEach(() => {
      component.setProps({ suggestions: mockSuggestions });
      suggestionBox = component.find("#suggestions");
    });

    it("should render all options on the suggestion box", () => {
      expect(suggestionBox.element.children.length).toEqual(mockSuggestions.length);
    });

    it("should set the option text as the suggestion name", () => {
      const dataListOptions = Array.from(suggestionBox.element.children);
      dataListOptions.forEach((option, index) => {
        expect(option.textContent).toEqual(mockSuggestions[index]);
      });
    });
  });
});
