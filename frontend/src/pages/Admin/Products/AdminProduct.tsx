import '../../../assets/css/Admin.css'
import { useState } from "react";
import { config } from "../../../config";
import useProduct from "../../../hooks/useProduct"
import { IProduct } from "../../../models/lebonson/Product";
import Spinner from "../../../components/Spinner/Spinner";
import FormAdminProduct from "./FormAdminProduct";
import productActions from '../../../actions/productActions';
import AuthRequiredAdmin from '../../../hocs/AuthRequiredAdmin'

function AdminProduct() {
  const { products, isLoading, dispatch } = useProduct()  

  const [isCreate, setIsCreate] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [product, setProduct] = useState<IProduct | null>(null)

  const handleEdit = (id: number) => {
    setIsEdit(true)
    setIsCreate(false)

    const product = products.find((p: IProduct) => p.id === id)
    setProduct(product);
  }

  const handleDelete = (product: IProduct) => {
    const confirmed = window.confirm('Delete this product ?')
    if(confirmed) {
      dispatch(productActions.deleteProduct(product))
    }
  }

  if(isLoading) return <Spinner />
  
  return (
    <div className="admin">
      <button 
        className="add-product" 
        title="Create a product"
        onClick={() => {
          setIsCreate(true)
          setIsEdit(false)
        }}
      >
        <i className="fas fa-plus"></i>
      </button>
      {products && products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: IProduct) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={`${config.API_IMG}/${product.image}`} />
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>

                <td>
                  <button
                    onClick={() => handleEdit(product.id as number)}
                  >
                    <i className="fas fa-pen-alt"></i>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(product)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <div className='zeroList'>Il n'y a pas de produit, ajoutez en !</div>}

      {/* Create Product */}
      {isCreate && <FormAdminProduct product={null} />}
      {isEdit && <FormAdminProduct product={product} />}
    </div>
  )
}

export default AuthRequiredAdmin(AdminProduct)
