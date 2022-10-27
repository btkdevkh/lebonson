import { Route, Routes } from 'react-router-dom'
import ForgotPassword from '../pages/Password/ForgotPassword'
import ResetPassword from '../pages/Password/ResetPassword'

export default function PasswordRoutes() {
  return (
    <Routes>
      <Route path='password/step_one' element={<ForgotPassword />} />
      <Route path='password/step_two/:token' element={<ResetPassword />} />
    </Routes>
  )
}
