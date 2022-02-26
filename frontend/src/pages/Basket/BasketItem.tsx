import '../../assets/css/Basket.css'
import { IProduct } from "../../models/lebonson/Product"
import { FaPenAlt, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import useBaskets from '../../hooks/useBaskets'
import { useDispatch } from 'react-redux'
import basketActions from '../../actions/basketActions'
import useProducts from '../../hooks/useProducts'

type Props = {
  basket: IProduct
  idx: number
}

export default function BasketItem({ basket, idx }: Props) {
  const dispatch = useDispatch()
  const { baskets } = useBaskets()
  const { products } = useProducts()

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
              <Link to={`/product/details/${realBaskets.id}`}>
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
