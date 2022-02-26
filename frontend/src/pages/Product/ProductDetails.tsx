import '../../assets/css/ProductDetails.css'
import { useParams } from 'react-router-dom'
import { IProduct } from '../../models/lebonson/Product';
import Spinner from '../../components/Spinner/Spinner';
import SelectQtyForm from '../../components/Form/SelectQtyForm';
import useProducts from '../../hooks/useProducts';
import HeadingH2 from '../../components/Heading/HeadingH2';
import { config } from '../../config';
import SimpleLink from '../../components/Link/SimpleLink';
import { FaHome, FaShoppingBasket } from 'react-icons/fa';

export default function ProductDetails() {  
  const { id } = useParams()
  const { products, isLoading } = useProducts() 

  const product: IProduct = products && products.find((product: IProduct) => product.id === Number(id))  
  
  if(isLoading) return <Spinner />
  
  return (
    <>
      { product && (
        <>
          <div className='product-details'>
            <SimpleLink to='/' className={'mb'}><FaHome /> Retour</SimpleLink>

            <HeadingH2>{product.title}</HeadingH2>
            <div className="product-details">
              <div className="product-details-img">
                <img src={config.API_IMG + product.image} alt={product.title} />
              </div>
              <div className='product-details-description'>
                <p>{product.description}</p>
              </div>
            </div>
            <p className='mb'><b>{product.price.toFixed(2)}€</b></p>
            <button
              className={`
                btn mb ${product.quantity === 0 ? 
                'btn-danger' : 
                'btn-primary'}
              `}
            >
              {product.quantity === 0 ? 'Rupture de stock' : 'En stock'}
            </button>
            <SelectQtyForm product={product} />

            <SimpleLink to="/basket"><FaShoppingBasket /> Voir le panier</SimpleLink>
          </div>
        </>
      ) }
    </>
  )
}
