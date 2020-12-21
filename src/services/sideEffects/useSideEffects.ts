import { useContext } from "react";
import { SideEffectContext } from "./context";
import { SideEffectsBundle } from "../../types/sideEffect";

const useSideEffects = (): SideEffectsBundle => {
    return useContext(SideEffectContext)
}

export default useSideEffects;
