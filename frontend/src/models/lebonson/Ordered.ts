export interface IOrdered {
  id?: number
  userId: number
  totalamount?: number
  status?: string,
  creationtimestamp?: string
}

export class Ordered implements IOrdered {
  id?: number = 0
  userId: number = 0
  totalamount: number = 0
  status: string = ''
  creationtimestamp?: string = ''

  static hydrateData(data: any) {
    const output = new Ordered()

    if(!output.id) {
      return null
    }

    output.id = data.id ?? -1
    output.userId = data.userId ?? -1
    output.totalamount = data.totalamount ?? -1
    output.status = data.status ?? ''
    output.creationtimestamp = data.creationtimestamp ?? ''

    return output
  }

  static dehydrateData(data: IOrdered) {
    const output: any = {}

    output.id = data.id ?? -1
    output.userId = data.userId ?? -1
    output.totalamount = data.totalamount ?? -1
    output.status = data.status ?? ''
    output.creationTimestamp = data.creationtimestamp ?? ''

    return output
  }
}
