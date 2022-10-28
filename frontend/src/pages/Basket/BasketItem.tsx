import '../../assets/css/Basket.css'
import { IProduct } from "../../models/lebonson/Product"
import { FaPenAlt, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useBasket from '../../hooks/useBasket'
import basketActions from '../../actions/basketActions'
import useProduct from '../../hooks/useProduct'

type Props = {
  basket: IProduct
}

export default function BasketItem({ basket }: Props) {
  const { baskets, dispatch } = useBasket()
  const { products } = useProduct()

  const realBaskets: IProduct = products.find((p: IProduct) => p.id === basket.id)    

  let TVA = 0.5
  const handleDeleteFromBaskets = (id: number) => {
    dispatch(basketActions.removeFromBasket(id, baskets))
  }

  return (
    <>
      { realBaskets && (
        <div className='product-baskets-item'>
          <div>
            <h4>Article :</h4>
            <h4>Prix :</h4>
            <h4>TVA :</h4>
            <h4>Quantitée(s) :</h4>
          </div>

          <div>
            <p>{realBaskets.title}</p>
            <p>{realBaskets.price.toFixed(2)}€</p>
            <p>{TVA.toFixed(2)}€</p>
            <p>{basket.selectedQuantity}</p>
          </div>

          <div>
            <div className='updateBtn'>
              <Link to={`/products/${realBaskets.id}`}>
                <FaPenAlt color='orange' />
              </Link>
            </div>
            <div
              className='deleteBtn' 
              onClick={() => {
                handleDeleteFromBaskets(realBaskets.id as number)
              }}
            >
              <FaTrash color='red' />
            </div>
          </div>
        </div>
      ) }
    </>
  )
}
