import '../../assets/css/Orders.css'
import { useEffect } from "react"
import orderActions from "../../actions/orderActions"
import useOrder from "../../hooks/useOrder"
import useUser from "../../hooks/useUser"
import OrderItem from './OrderItem'
import { IOrdered } from '../../models/lebonson/Ordered'
import HeadingH2 from '../../components/Heading/HeadingH2'
import SimpleLink from '../../components/Link/SimpleLink'
import { FaHome } from 'react-icons/fa'

export default function Orders() {
  const { user } = useUser()
  const { orders, dispatch } = useOrder()  

  useEffect(() => {
    dispatch(orderActions.getOrdersByUserId(user.id))
  }, [])

  return (
    <>
      {orders.length > 0 ? (
        <div className="orders-container">
          {orders.map((order: IOrdered) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center'}}>
          <HeadingH2>Pas de commandes</HeadingH2>
          <SimpleLink to='/'><FaHome /> Retour</SimpleLink>
        </div>
      )}
    </>
  )
}
