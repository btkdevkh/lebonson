import { IOrdered } from "../../models/lebonson/Ordered"
import moment from 'moment'

type Props = {
  order: IOrdered
}

export default function OrderItem({ order }: Props) {
  return (
    <div className="order-item">
      <p>Commande numéro : #{order.id}</p>
      <hr />
      <p>Totals prix de la commande : {order.totalamount}€</p>
      <hr />
      <p>Commande effectuée le {moment(order.creationtimestamp).format('L')}</p>
      <hr />
      <p>Statut : {order.status === 'Paid' && 'Payé'}</p>
    </div>
  )
}
