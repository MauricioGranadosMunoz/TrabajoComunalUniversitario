import { Button, Modal } from "flowbite-react";
import { Formik, Field } from 'formik';
import { registrarUsuario } from "../../store/slices/usuarios/usuariosThunk";
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setToggleModal } from "../../store/slices/userInterface/userInterface";

interface InitialValuesType {
  nombre: string;
  apellidos: string;
  rol: number;
  password: string;
  confirmPassword: string;
  email: string;
}

export const UserModal = () => {
  const { isModalOpen } = useAppSelector( (state) => state.userInterface);
  const dispatch = useAppDispatch();
  const initFormValues: InitialValuesType = {
    nombre: '',
    apellidos: '',
    email: '',
    rol: 1,
    password: '',
    confirmPassword: ''
  }
  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
    .required('Nombre es requerido')
    .min(2, 'Nombre debe tener al menos 2 caracteres')
    .max(15, 'Nombre no debe tener mas de 15 caracteres')
    .matches(/^[a-zA-Z ]+$/, 'Nombre solo debe tener palabras y espacios'),
    
    apellidos: Yup.string()
    .required('Apellido es requerido')
    .min(2, 'Apellido debe tener al menos 2 caracteres')
    .max(15, 'Apellido no debe tener mas de 15 caracteres')
    .matches(/^[a-zA-Z ]+$/, 'Apellido solo debe tener palabras y espacios'),

    email: Yup.string()
    .email('Dirección de email invalida')
    .required('Email es requerido'),

    password: Yup.string()
    .min(8, 'Contraseña debe de ser de al menos 8 caracteres de largo')
    .max(15, 'Contraseña no debe ser mayor a 15 caracteres de largo')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.'
    )
    .required('Contraseña Requerida'),

    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Contraseñas deben coincidir')
    .required('Confirmar Contraseña es requerida')
  });

  return (
    <>
      <Modal show={ isModalOpen } onClose={ () => dispatch(setToggleModal()) } >
        <Modal.Header>
          Agregar Nuevo Usuario
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={ initFormValues }
            validationSchema={ validationSchema }
            onSubmit={({ nombre, apellidos, rol, password, email }) => {
              dispatch(registrarUsuario({
                nombre,
                apellidos,
                rol,
                password,
                email
              }))
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <form id="userRegister" onSubmit={ handleSubmit }>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label htmlFor="nombre" className={ `block text-sm font-medium leading-6${ (errors.nombre && touched.nombre) ? ' text-red-600' : ' text-gray-900' }` }>
                            Nombre
                          </label>
                          <div className="mt-2">
                            <Field
                              type="text"
                              name="nombre"
                              value={ values.nombre }
                              onChange={ handleChange }
                              className={ `px-4 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.nombre && touched.nombre) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                            />
                            { errors.nombre && touched.nombre && ( <span className="inline-flex text-sm text-red-700">{errors.nombre}</span> ) }
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.apellidos && touched.apellidos) ? ' text-red-600' : ' text-gray-900' }` }>
                            Apellidos
                          </label>
                          <div className="mt-2">
                            <Field
                              type="text"
                              name="apellidos"
                              value={ values.apellidos }
                              onChange={ handleChange }
                              className={ `px-4 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.apellidos && touched.apellidos) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                            />
                            { errors.apellidos && touched.apellidos && ( <span className="inline-flex text-sm text-red-700">{errors.apellidos}</span> ) }
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                        <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.email && touched.email) ? ' text-red-600' : ' text-gray-900' }` }>
                            Correo Electronico
                          </label>
                          <div className="mt-2">
                            <Field
                              id="email"
                              name="email"
                              type="email"
                              className={ `px-4 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.email && touched.email) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                            />
                            { errors.email && touched.email && ( <span className="inline-flex text-sm text-red-700">{errors.email}</span> ) }
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.password && touched.password) ? ' text-red-600' : ' text-gray-900' }` }>
                            Contraseña
                          </label>
                          <div className="mt-2">
                            <Field
                              id="password"
                              name="password"
                              type="password"
                              className={ `px-4 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.password && touched.password) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                            />
                            { errors.password && touched.password && ( <span className="inline-flex text-sm text-red-700">{errors.password}</span> ) }
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label htmlFor="last-name" className={ `block text-sm font-medium leading-6${ (errors.confirmPassword && touched.confirmPassword) ? ' text-red-600' : ' text-gray-900' }` }>
                              Confirmar Contraseña
                          </label>
                          <div className="mt-2">
                            <Field
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              className={ `px-4 py-2 w-full block rounded outline-none focus:ring-2 ${ (errors.confirmPassword && touched.confirmPassword) ? ' text-red-900 placeholder-red-700 border border-red-500 focus:ring-red-500 focus:border-red-500' : 'ring-2 focus:ring-indigo-600 text-gray-900 ring-gray-300 placeholder:text-gray-400'}` }
                            />
                            { errors.confirmPassword && touched.confirmPassword && ( <span className="inline-flex text-sm text-red-700">{errors.confirmPassword}</span> ) }
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label htmlFor="rol" className="block text-sm font-medium leading-6 text-gray-900">
                            Rol de usuario
                          </label>
                          <div className="mt-2">
                            <select
                              id="rol"
                              name="rol"
                              defaultValue={values.rol}
                              onChange={handleChange}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value={ 0 } >Administrador</option>
                              <option value={ 1 } >Vendedor</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <Modal.Footer className="pl-0 pr-0 pb-0">
                  <Button type="submit">Guardar Nuevo Usuario</Button>
                  <Button color="gray" onClick={ () => dispatch(setToggleModal()) }>Cancelar</Button>
                </Modal.Footer>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  )
}