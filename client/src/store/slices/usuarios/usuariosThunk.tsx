import { Dispatch } from "redux";
import { setCurrentUser, setUsers } from "./usuariosSlice";
import { baseApi } from "../../../api/apiConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface usuarioType {
    nombre: string;
    apellidos: string;
    email: string;
    rol: number;
    password: string;
}


const loginUsuario = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setCurrentUser({
            nombre: 'Jose Mauricio Granados M',
            email: 'mgranadosmunoz@gmail.com',
            rol: 1,
        }))
    };
};
const registrarUsuario = (usuario: usuarioType) => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.post("/usuarios", usuario);
        if(data.status === 409){
            toast.warn('¡Correo Electronico en uso!')
        } else if (data.status === 201) {
            toast.success('¡Usuario agregado con éxito!')
        } else {
            toast.error('¡Error agregando usuario!')
        }
    };
};
const getAllUsers = () => {
    return async (dispatch: Dispatch) => {
        const { data } = await baseApi.get("/usuarios");
        dispatch(setUsers(data));
    }
};
export {
    loginUsuario,
    registrarUsuario,
    getAllUsers
}