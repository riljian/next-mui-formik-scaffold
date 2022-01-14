import Dish from './Dish'

type ServingSize = {
  unit: string
  value: string
}

enum SKUType {
  NormalDish,
  AdditionalDish,
  Tableware,
}

export default class SKU {
  id: number
  type: SKUType
  name: string
  description: string
  price: number
  servingSize: ServingSize | null = null
  dish: Dish | null = null
  relatedSKU: SKU[] = []

  constructor({
    id,
    type,
    name,
    description,
    price,
    servingSize = null,
    dish = null,
    relatedSKU = [],
  }: {
    id: number
    type: SKUType
    name: string
    description: string
    price: number
    servingSize?: ServingSize | null
    dish?: Dish | null
    relatedSKU?: SKU[]
  }) {
    this.id = id
    this.type = type
    this.name = name
    this.description = description
    this.price = price
    this.servingSize = servingSize
    this.dish = dish
    this.relatedSKU = relatedSKU
  }
}
