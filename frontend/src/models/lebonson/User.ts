export interface IUser {
  id?: number
  firstName?: string
  lastName?: string
  email: string
  password: string
  address?: string
  zip?: number
  city?: string
}

export class User implements IUser {
  id?: number = 0
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  password: string = ''
  address: string = ''
  zip: number = 0
  city: string = ''

  static hydrateData(data: any) {
    const output = new User()

    if(!output.id) {
      return null
    }

    output.id = data.id ?? -1
    output.firstName = data.firstName ?? ''
    output.lastName = data.lastName ?? ''
    output.email = data.email ?? ''
    output.password = data.password ?? ''
    output.zip = data.zip ?? -1
    output.city = data.city ?? ''

    return output
  }

  static dehydrateData(data: IUser) {
    const output: any = {}

    output.id = data.id ?? -1
    output.firstName = data.firstName ?? ''
    output.lastName = data.lastName ?? ''
    output.email = data.email ?? ''
    output.password = data.password ?? ''
    output.zip = data.zip ?? -1
    output.city = data.city ?? ''

    return output
  }
}
