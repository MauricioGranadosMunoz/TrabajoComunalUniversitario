import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/Auth/LoginPage'
import { RegisterPage } from '../pages/Auth/RegisterPage'

export const AppRouter = () => {
  return (
    <>
      <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<RegisterPage />} />
      </Routes>
    </>
  )
}