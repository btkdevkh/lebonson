import { useEffect, useState } from "react";
import HeadingH2 from "../../../components/Heading/HeadingH2";
import productActions from '../../../actions/productActions'
import uploadActions from '../../../actions/uploadActions'
import useUpload from "../../../hooks/useUpload";
import { toast } from "react-toastify";
import { IProduct } from "../../../models/lebonson/Product";
import { useNavigate } from "react-router-dom";

type Props = {
  product: IProduct | null
}

export default function FormAdminProduct({ product }: Props) {  
  const { dispatch } = useUpload()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [image, setImage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [imageError, setImageError] = useState('')
  const [description, setDescription] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {    
    const selectedFile = e.target.files ? e.target.files[0] : null;
    const typeFiles = ['jpg', 'jpeg', 'png']
    
    if(!selectedFile) {
      setImageError('Please select an image')
      return
    }

    if(selectedFile && !typeFiles.includes(selectedFile.type.split('/')[1])) {
      setImageError('Please select only JPG, JPEG or PNG format')
      return
    }

    setImage(`${Date.now()}.${selectedFile.name.split('.')[1]}`)
    setFile(selectedFile)
    setImageError('')    
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const productFromForm = {
      title,
      price,
      quantity,
      image: image ? image : 'no-picture.jpg',
      description
    }

    // upload Image
    dispatch(uploadActions.saveProductImage(file as File, image))

    // Update Product
    if(product) {
      dispatch(productActions.updateProduct(productFromForm, product.id as number))
      toast.success('Product updated')
      navigate('/')
    } else {
      // Create Product
      dispatch(productActions.createProduct(productFromForm))
      toast.success('Product ceated')
      navigate('/')
    }
  }

  useEffect(() => {
    if(product) {
      setTitle(product.title)
      setPrice(product.price)
      setQuantity(product.quantity)
      setDescription(product.description)
      setImage(product.image)
    }
  }, [product])

  return (
    <div className="form-admin">
      <form className="form-group" onSubmit={onSubmit} encType='multipart/form-data'>
        <HeadingH2>{product ? 'Update' : 'Create'} Product</HeadingH2>
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input 
            id='price'
            type="number" 
            placeholder="Price" 
            value={price}
            min={1}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="quantity">Quantity</label>
          <input 
            id="quantity"
            type="number" 
            placeholder="Quantity" 
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(+e.target.value)}
          />
        </div>
        <div className="form-control">
          <textarea 
            placeholder="Description" 
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </textarea>
        </div>

        <div className="form-control">
          <input 
            type='file'
            name="image"
            onChange={handleFileChange}
          />
          <div>
            Image in database : <> </>
            {
              product ? 
              <em><strong>{image}</strong></em> : 
              <em>None</em>
            }
          </div>
          <div className="error mb mt">{imageError && imageError}</div>
        </div>
        <button type="submit" className="btn btn-block mb">Valider</button>
      </form>
    </div>
  )
}
