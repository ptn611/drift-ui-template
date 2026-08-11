import { useEffect } from "react";
import { SwiftClient } from "@velocity-exchange/common";
import { useDriftStore } from "../../stores/DriftStore";

export const useSyncSwiftClientHealth = () => {
  const drift = useDriftStore((state) => state.drift);
  const set = useDriftStore((state) => state.set);

  useEffect(() => {
    if (!drift) return;

    SwiftClient.init(drift.driftEndpoints.swiftServerUrl, "drift-ui-template");

    const checkSwiftClientHealth = async () => {
      const isHealthy = await SwiftClient.isSwiftServerHealthy();
      set((state) => {
        state.isSwiftClientHealthy = isHealthy;
      });
    };

    checkSwiftClientHealth();

    const interval = setInterval(checkSwiftClientHealth, 60_000);

    return () => clearInterval(interval);
  }, [drift, set]);
};
