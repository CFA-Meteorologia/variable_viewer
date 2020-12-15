import {createContext, FC} from "react";
import { useStore } from "react-redux";
import sideEffects from "./sideEffects";
import {SideEffectBody, SideEffects} from "types/sideEffect";

const context = createContext<SideEffects>({});
context.displayName = 'SideEffects context';

export const SideEffectContext = context;
export const SideEffectConsumer = context.Consumer;

export const SideEffectProvider:FC = ({ children }) => {
    const store = useStore();

    const values = Object.entries(sideEffects)
        .map<[string, SideEffectBody]>(([key, s]) => [key, s(store)])
        .reduce((previous, [key, v]) => ({ [key]: v, ...previous }), {});

    return <context.Provider value={values}>
        {children}
    </context.Provider>

}
