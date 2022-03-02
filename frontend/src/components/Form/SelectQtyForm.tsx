import { IProduct } from '../../models/lebonson/Product'
import { useState } from 'react';
import basketActions from '../../actions/basketActions';
import { useNavigate } from 'react-router-dom';
import useBasket from '../../hooks/useBasket';

type Props = {
  product: IProduct
}

type ArrQtyNum = []

export default function SelectQtyForm({ product }: Props) { 
  const navigate = useNavigate() 
  
  const { baskets, dispatch } = useBasket() 
  const basket = baskets.find((b: IProduct) => b.id === product.id)

  const [qty, setQty] = useState<string|number>(basket?.selectedQuantity ?? 1)

  // let quantities: number[] = []
  // for(let i = 1; i <= product.quantity; i++) {
  //   quantities.push(i)
  // }

  const handleAddToBasket = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(basketActions.addToBasket(product, Number(qty), baskets))

    navigate('/basket')
  }
  
  return (
    <div className='basket'>
      <form className='mb' onSubmit={handleAddToBasket}>
        <select 
          className='mb'
          name="quantity" 
          id="quantity" 
          disabled={product.quantity === 0 ? true : false}
          style={{
            border: product.quantity === 0 ? '2px solid darkred' : '2px solid darkgreen'
          }}
          onChange={(e) => setQty(e.target.value)}
          value={qty}
        >
          <option>Quantitée(s)</option>
          { [...Array(product.quantity).keys() as unknown as ArrQtyNum].map(quantity => (
            <option key={quantity} value={quantity + 1}>{quantity + 1}</option>
          )) }
        </select>

        { product.quantity > 0 && <button type='submit' className='btn mb btn-block'>Ajouter au panier</button> }
      </form>
    </div>
  )
}
