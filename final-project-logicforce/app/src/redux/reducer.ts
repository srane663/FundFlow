import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientState {
  toggleForm: boolean;
  formId: string | undefined;
  deleteId: string | null;
}

interface RootState {
  client: ClientState;
}

const initialState: RootState = {
  client: { toggleForm: false, formId: undefined, deleteId: null },
};

export const ReducerSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    updateAction: (state, action: PayloadAction<string | undefined>) => {
      state.client.formId = action.payload;
    },
    deleteAction: (state, action: PayloadAction<string | null>) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const { toggleChangeAction, updateAction, deleteAction } = ReducerSlice.actions;

export default ReducerSlice.reducer;
