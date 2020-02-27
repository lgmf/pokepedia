import { RootState } from "@/root.state";
import { Getter, GetterTree } from "vuex";
import { EffectivenessState } from "../models/effectiveness.state";

const getKeyByViewMode = (viewMode: "atk" | "def"): Getter<EffectivenessState, RootState> => (state) => {
  if (!state.pokemon) return [];

  const effectiveness = viewMode === "atk" ? state.pokemon.attackEffectiveness : state.pokemon.defenseEffectiveness;
  const emptyValues = ([keys, values]: any) => !!values.length;
  const toKey = ([keys]: any) => keys;
  return Object.entries(effectiveness).filter(emptyValues).map(toKey);
};

const defKeys: Getter<EffectivenessState, RootState> = getKeyByViewMode("def");

const atkKeys: Getter<EffectivenessState, RootState> = getKeyByViewMode("atk");

export const getters: GetterTree<EffectivenessState, RootState> = {
  defKeys,
  atkKeys
};

export default getters;
