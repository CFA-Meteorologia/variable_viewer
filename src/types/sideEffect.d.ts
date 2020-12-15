import { AppStore } from "./appStore";
import {Store} from "redux";

type SideEffectBody = (params: any) => void;

export type SideEffect = (store: Store<AppStore>) => SideEffectBody;

export type SideEffects = { [key: string]: SideEffectBody };
