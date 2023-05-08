import { Link } from "react-router-dom"

export const LoginPage = () => {
  return (
    <div>
        <h1>LoginPage</h1>
        <Link to={'/registrar'}>Registrar</Link>
    </div>
  )
}