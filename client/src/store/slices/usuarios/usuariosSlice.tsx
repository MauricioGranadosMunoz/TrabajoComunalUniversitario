import { createSlice } from '@reduxjs/toolkit';

interface currentUserType {
    nombre: string;
    email: string;
    rol: number;
}

interface usuariosInitialValuesType {
    currentUser: currentUserType,
    users: []
}

const initialState: usuariosInitialValuesType = {
    currentUser: {
        nombre: '',
        email: '',
        rol: 0,
    },
    users: []
};

export const usuarioSlice = createSlice({
    name: 'usuarios',
    initialState,
    reducers: {
      setCurrentUser(state, action) {
        state.currentUser = action.payload;
      },
      setUsers(state, action) {
        state.users = action.payload;
      },
    },
});
  
export const { setCurrentUser, setUsers } = usuarioSlice.actions;