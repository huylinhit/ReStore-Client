export const INCREMENT_COUNTER = "INCREMENT_COUTER";
export const DECREMENT_COUNTER = "DECREMENT_COUTER";


export interface CounterState {
    data: number
    title: string
}


const initialState: CounterState = {
    data: 42,
    title: 'YANC - State'
};


export default function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload
            }
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }

        default:
            return state;
    }
}