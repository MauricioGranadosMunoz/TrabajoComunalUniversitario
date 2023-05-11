import { getAllUsers } from "../../store/slices/usuarios/usuariosThunk";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { UserModal } from '../../components/Modals/UserModal';
import { Button } from 'flowbite-react';
import { setToggleModal } from '../../store/slices/userInterface/userInterface';
import { Column, useTable } from 'react-table';
import { useEffect, useMemo } from 'react';
import { DataTable } from '../../components/Tables/DataTable';

interface ExampleObject {
  id: number,
  nombre: string,
  email: string,
  last_login: string,
  rol: number,
}

export const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const { users: data } = useAppSelector( (state) => state.usuarios);

  useEffect(() => {
    dispatch(getAllUsers());
  })
  
  const columns: Column<ExampleObject>[] = useMemo(() => [
    {
      Header: 'ID',
      accessor: "id" as keyof ExampleObject,
    },
    {
        Header: 'Nombre',
        accessor: "nombre" as keyof ExampleObject,
    },
    {
        Header: 'Rol',
        accessor: "rol" as keyof ExampleObject,
    },
    {
      Header: 'Ultimo Login',
      accessor: "last_login" as keyof ExampleObject,
    }
  ], [])

  const tableInstance = useTable({columns, data})

  return (
    <>
      <Button onClick={ () => dispatch(setToggleModal()) }>
          Toggle modal
      </Button>
      <UserModal/>
      <DataTable tableInstance={tableInstance}/>
    </>
  )
}