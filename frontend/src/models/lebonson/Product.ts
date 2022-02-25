export interface IProduct {
  id?: number
  title: string
  price: number
  image: string
  quantity: number
  description: string
  selectedQuantity?: number
}

export class Product implements IProduct {
  id?: number = 0
  title: string = ''
  price: number = 0
  image: string = ''
  quantity: number = 0
  description: string = ''
  selectedQuantity?: number = 0


  static hydrateData(data: any) {
    const output = new Product()

    if(!output.id) {
      return null
    }

    output.id = data.id ?? -1
    output.title = data.title ?? ''
    output.price = data.price ?? -1
    output.image = data.image ?? ''
    output.quantity = data.quantity ?? -1
    output.description = data.city ?? ''
    output.selectedQuantity = data.selectedQuantity ?? -1

    return output
  }

  static dehydrateData(data: IProduct) {
    const output: any = {}

    output.id = data.id ?? -1
    output.title = data.title ?? ''
    output.price = data.price ?? -1
    output.image = data.image ?? ''
    output.quantity = data.quantity ?? -1
    output.description = data.description ?? ''
    output.selectedQuantity = data.selectedQuantity ?? -1

    return output
  }
}
