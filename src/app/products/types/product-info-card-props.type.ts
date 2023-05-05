import { ProductDto } from "./product-dto.type"

export type ProductInfoCardProps = {
  isOpen: boolean, 
  handle: () => void,
  product: ProductDto
}