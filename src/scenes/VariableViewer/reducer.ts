export interface IVariableViewerState {
    currentDate: string;
}

const initialState: IVariableViewerState = {
    currentDate: '2020-07-06_00:00:00',
}

const reducer = function(state = initialState, { type, payload }) {
    switch (type) {
        default:
            return state;
    }
}

export default reducer
