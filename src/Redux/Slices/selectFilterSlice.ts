import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const selectFilterSlice = createSlice({
    initialState: 'all' as string,
    name: 'selectFilter',
    reducers: {
        changeSelectFilter: (_, action: PayloadAction<string>) => action.payload
    }
})

export const { changeSelectFilter } = selectFilterSlice.actions