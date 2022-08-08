import { useEffect, useState } from "react";
import HeadingH2 from "../../../components/Heading/HeadingH2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../models/lebonson/User";
import useUser from "../../../hooks/useUser";
import userActions from "../../../actions/userActions";

type Props = {
  user: IUser | null
}

export default function FormAdminUser({ user }: Props) {  
  const navigate = useNavigate()
  const { dispatch } = useUser()

  const [role, setRole] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(role);
    
    if(user) {
      dispatch(userActions.updateUserRole({ role }, user?.id as number))

      toast.success('User\'s role updated')
      navigate('/')
    }
  }

  useEffect(() => {
    if(user) {
      setRole(user.role as string)
    }
  }, [user])

  return (
    <div className="form-admin">
      <form className="form-group" onSubmit={onSubmit} encType='multipart/form-data'>
        <HeadingH2>Update User's Role</HeadingH2>
        <div className="form-control">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <button type="submit" className="btn btn-block mb">Valider</button>
      </form>
    </div>
  )
}
