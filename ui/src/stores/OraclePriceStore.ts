import { OraclePriceData } from "@velocity-exchange/sdk";
import { MarketId, OraclePriceLookup } from "@velocity-exchange/common";
import { produce } from "immer";
import { create } from "zustand";

export interface OraclePriceStore {
  set: (x: (s: OraclePriceStore) => void) => void;
  get: () => OraclePriceStore;
  lookup: OraclePriceLookup;
  getOraclePrice: (marketId: MarketId) => OraclePriceData;
}

export const useOraclePriceStore = create<OraclePriceStore>((set, get) => ({
  set: (fn) => set(produce(fn)),
  get: () => get(),
  lookup: {},
  getOraclePrice: (marketId: MarketId) => {
    const { lookup } = get();

    return lookup[marketId.key];
  },
}));
