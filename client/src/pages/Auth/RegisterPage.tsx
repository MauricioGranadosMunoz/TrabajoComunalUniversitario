import { Link } from "react-router-dom"

export const RegisterPage = () => {
  return (
    <div>
      <h1>RegisterPage</h1>
      <Link to={'/login'}>Login</Link>
    </div>
  )
}