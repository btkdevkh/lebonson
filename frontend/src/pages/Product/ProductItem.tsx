import '../../assets/css/ProductItem.css'
import { IProduct } from "../../models/lebonson/Product"
import { config } from '../../config'

type Props = {
  product: IProduct
}

export default function ProductItem({ product }: Props) {
  return (
    <>
      <div className="product-item">
        <div className="product-item-img">
          <img src={config.API_IMG + product.image} alt={product.title} />
        </div>
        <div className='product-item-description'>
          <h4>{product.title.length > 20 ? `${product.title.slice(0, 20).toLowerCase()}...` : product.title}</h4>
          <p><b>{product.price.toFixed(2)}€</b></p>
          <p>{product.description.length > 50 ? `${product.description.slice(0, 40)}...` : product.description}</p>
        </div>
      </div>
    </>
  )
}
