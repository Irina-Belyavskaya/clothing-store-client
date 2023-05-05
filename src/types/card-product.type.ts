import { ProductDto } from "app/products/types/product-dto.type";

export type CardProduсtParams = {
  product: ProductDto,
  orderQuantity: number | undefined;
}