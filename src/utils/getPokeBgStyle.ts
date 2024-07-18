import { POKEBG_COLORS } from "../constants/PokeBgColors";

export function getPokeBgColor(types: string[]) {
  let allType = types.map((name) => POKEBG_COLORS[name]);
  return {
    background: allType.length > 1 ? `linear-gradient(${allType})` : allType[0],
  };
}
