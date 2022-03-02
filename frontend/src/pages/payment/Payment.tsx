import '../../assets/css/Payment.css'
import Basket from "../Basket/Basket";
import Profil from "../Profil/Profil";
import SimpleLink from "../../components/Link/SimpleLink";
import { FaHome, FaRegCreditCard } from "react-icons/fa";
import useUser from "../../hooks/useUser";
import useBasket from "../../hooks/useBasket";
import { createCheckoutOrder, createOrder } from "../../api/orderServiceApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate()

  const { baskets } = useBasket()
  const { user } = useUser()  

  const [isValidate, setIsValidate] = useState(false)
  
  const handleValidateBasket = async () => {
    const order = {
      user_id: user.id,
      products: baskets
    }

    const res = await createOrder(order)            
    setIsValidate(true)

    if(res.status === 200) {
      const data = await createCheckoutOrder({...order, order_id: res.order_id})
      if(data) window.location = data.url
    }
  }

  useEffect(() => {
    baskets.length === 0 && navigate('/')
  }, [baskets.length])

  return (
    <div className='payment'>
      <SimpleLink to='/' className='mb'><FaHome /> Retour</SimpleLink>
      <div className="payment-flex">
        <Basket />
        <Profil />
      </div>

      <br />

      {isValidate ? (
        null
      ) : (
        <button
          className='btn btn-block'
          onClick={handleValidateBasket}
        >
          <FaRegCreditCard /> Payer la commande
        </button>
      )}
    </div>
  )
}
