import { createSlice } from "@reduxjs/toolkit";


//Tao counterSlice
//Khoi tai initial 
//createSlice 

export interface CounterState {
    data: number
    title: string
}


const initialState: CounterState = {
    data: 42,
    title: 'YANC - State'
};

export const counterSlice = createSlice({
    name: 'couter',
    initialState: initialState,
    reducers: {
        increment: (state, action) =>{
            state.data += action.payload
        },
        decrement: (state,action ) =>{
            state.data -= action.payload
        }
    }
});

export const {increment, decrement} = counterSlice.actions;