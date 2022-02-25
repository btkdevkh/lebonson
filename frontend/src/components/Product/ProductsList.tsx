import '../../assets/css/ProductsList.css'
import { Link } from 'react-router-dom'
import { IProduct } from "../../models/lebonson/Product"
import Spinner from "../Spinner/Spinner"
import ProductItem from "./ProductItem"
import HeadingH2 from '../Heading/HeadingH2'
import useProducts from '../../hooks/useProducts'

export default function ProductsList() {
  const { products, isLoading, isError, isSuccess } = useProducts()

  if(isLoading) return <Spinner />

  return (
    <>
      <HeadingH2>Derniers produits</HeadingH2>
      <section className="products-list">
        { 
          products &&
          products.map((product: IProduct) => (
            <Link key={product.id} to={`/product/details/${product.id}`}>
              <ProductItem product={product} />
            </Link>
          ))
        }
      </section>
    </>
  )
}
