import { TypeEffectiveness } from "@/core/models";

export default (value: keyof TypeEffectiveness) => {
  switch (value) {
    case "quad":
      return "4×";
    case "double":
      return "2×";
    case "regular":
      return "1×";
    case "half":
      return "½×";
    case "quarter":
      return "¼×";
    case "zero":
      return "0×";
    default:
      throw new Error(`option ${value} for damage label filter not found`);
  }
};
