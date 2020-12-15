import { useContext } from "react";
import { SideEffectContext} from "./context";

const useSideEffects = () => {
    return useContext(SideEffectContext)
}

export default useSideEffects;
