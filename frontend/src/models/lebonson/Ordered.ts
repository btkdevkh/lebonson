export interface IOrdered {
  id?: number
  userId: number
  totalAmount: number
  status: string
}

export class Ordered implements IOrdered {
  id?: number = 0
  userId: number = 0
  totalAmount: number = 0
  status: string = ''

  static hydrateData(data: any) {
    const output = new Ordered()

    if(!output.id) {
      return null
    }

    output.id = data.id ?? -1
    output.userId = data.userId ?? -1
    output.totalAmount = data.totalAmount ?? -1
    output.status = data.status ?? ''

    return output
  }

  static dehydrateData(data: IOrdered) {
    const output: any = {}

    output.id = data.id ?? -1
    output.userId = data.userId ?? -1
    output.totalAmount = data.totalAmount ?? -1
    output.status = data.status ?? ''

    return output
  }
}
