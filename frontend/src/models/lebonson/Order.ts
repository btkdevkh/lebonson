export interface IOrder {
  id?: number
  orderId: number
  productId: number
  quantity: number
  total: number
}

export class Order implements IOrder {
  id?: number = 0
  orderId: number = 0
  productId: number = 0
  quantity: number = 0
  total: number = 0

  static hydrateData(data: any) {
    const output = new Order()

    if(!output.id) {
      return null
    }

    output.id = data.id ?? -1
    output.orderId = data.orderId ?? -1
    output.productId = data.productId ?? -1
    output.quantity = data.quantity ?? -1
    output.total = data.total ?? -1

    return output
  }

  static dehydrateData(data: IOrder) {
    const output: any = {}

    output.id = data.id ?? -1
    output.orderId = data.orderId ?? -1
    output.productId = data.productId ?? -1
    output.quantity = data.quantity ?? -1
    output.total = data.total ?? -1

    return output
  }
}
