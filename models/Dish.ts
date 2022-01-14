export default class Dish {
  id: number
  name: string
  imageURL: string
  description: string
  active: boolean
  materials: string[]

  constructor({
    id,
    name,
    imageURL,
    description,
    active,
    materials = [],
  }: {
    id: number
    name: string
    imageURL: string
    description: string
    active: boolean
    materials?: string[]
  }) {
    this.id = id
    this.name = name
    this.imageURL = imageURL
    this.description = description
    this.active = active
    this.materials = materials
  }

  static loadFromListDishes = (data?: any[]): Promise<Dish[]> => {
    return Promise.resolve([
      new Dish({
        id: 1,
        name: '東坡肉',
        imageURL: 'http://dummyimage.com/169x100.png/dddddd/000000',
        description: '好吃東坡肉',
        active: true,
      }),
      new Dish({
        id: 2,
        name: '紹興雞腿',
        imageURL: 'http://dummyimage.com/215x100.png/5fa2dd/ffffff',
        description: '好吃紹興雞腿',
        active: false,
      }),
      new Dish({
        id: 3,
        name: '土窯雞',
        imageURL: 'http://dummyimage.com/154x100.png/ff4444/ffffff',
        description: '好吃土窯雞',
        active: true,
      }),
    ])
  }
}
