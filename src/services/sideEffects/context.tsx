import {createContext, FC} from "react";
import { useStore } from "react-redux";
import sideEffects from "./sideEffects";
import { SideEffects } from "types/sideEffect";
import {AppState} from "../../types/appState";

const context = createContext<SideEffects>({});
context.displayName = 'SideEffects context';

export const SideEffectContext = context;
export const SideEffectConsumer = context.Consumer;

export const SideEffectProvider:FC = ({ children }) => {
    const store = useStore<AppState>();

    const values = {};
    Object.entries(sideEffects)
        .forEach(([key, s]) => {
            const f = s(store);
            // so all sideEffects have access to others sideEffects
            f.bind(values);

            values[key] = f;
        })

    return <context.Provider value={values}>
        {children}
    </context.Provider>

}
