import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isModalOpen: false
};

export const userInterface = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
      setToggleModal(state) {
        state.isModalOpen = !state.isModalOpen;
      },
    },
});
  
export const { setToggleModal } = userInterface.actions;