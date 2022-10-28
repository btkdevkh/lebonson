export interface IUser {
  id?: number
  firstname?: string
  lastname?: string
  email: string
  password: string
  address?: string
  zip?: number
  city?: string,
  role?: string
}

export class User implements IUser {
  id?: number = 0
  firstname: string = ''
  lastname: string = ''
  email: string = ''
  password: string = ''
  address: string = ''
  zip: number = 0
  city: string = ''
  role?: string = ''

  static hydrateData(data: any) {
    const output = new User()

    if(!output.id) {
      return null
    }

    output.id = data.id ?? -1
    output.firstname = data.firstname ?? ''
    output.lastname = data.lastname ?? ''
    output.email = data.email ?? ''
    output.password = data.password ?? ''
    output.zip = data.zip ?? -1
    output.city = data.city ?? ''
    output.role = data.role ?? ''

    return output
  }

  static dehydrateData(data: IUser) {
    const output: any = {}

    output.id = data.id ?? -1
    output.firstname = data.firstname ?? ''
    output.lastname = data.lastname ?? ''
    output.email = data.email ?? ''
    output.password = data.password ?? ''
    output.zip = data.zip ?? -1
    output.city = data.city ?? ''
    output.role = data.role ?? ''

    return output
  }
}
