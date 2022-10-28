import '../../../assets/css/Admin.css'
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import userActions from '../../../actions/userActions';
import AuthRequiredAdmin from '../../../hocs/AuthRequiredAdmin'
import useUser from '../../../hooks/useUser';
import { IUser } from '../../../models/lebonson/User';
import FormAdminUser from './FormAdminUser';

function AdminUser() {
  const { users: allUser, isLoading, dispatch } = useUser()
  const users = allUser.filter((u: IUser) => u.email !== 'jkfolk91@live.fr')

  const [isEdit, setIsEdit] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)
  
  const handleEdit = (id: number) => {
    setIsEdit(true)

    const user = users.find((u: IUser) => u.id === id)
    setUser(user);
  }

  useEffect(() => {
    dispatch(userActions.getAllUsers())
  }, [dispatch])

  if(isLoading) return <Spinner />
  
  return (
    <div className="admin user">
      {users && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: IUser) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <button
                    onClick={() => handleEdit(user.id as number)}
                  >
                    <i className="fas fa-pen-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <div className='zeroList'>Il n'y a pas d'utilisateurs</div>}

      {isEdit && <FormAdminUser user={user} />}
    </div>
  )
}

export default AuthRequiredAdmin(AdminUser)
