import '../../assets/css/ProductsList.css'
import { Link } from 'react-router-dom'
import { IProduct } from "../../models/lebonson/Product"
import Spinner from "../../components/Spinner/Spinner"
import ProductItem from "./ProductItem"
import HeadingH2 from '../../components/Heading/HeadingH2'
import useProduct from '../../hooks/useProduct'

export default function Products() {
  const { products, isLoading } = useProduct()

  if(isLoading) return <Spinner />

  return (
    <>
      <HeadingH2>Matos</HeadingH2>
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
