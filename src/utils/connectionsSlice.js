import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connections",
    initialState: null,
    reducers : {
        addToConnections : (state, action) =>{
            return action.payload;
        },

        removeConnection : (state, action )=>{
            return null;
        },
    }
});

export const { addToConnections, removeConnection} = connectionSlice.actions;

export default connectionSlice.reducer;