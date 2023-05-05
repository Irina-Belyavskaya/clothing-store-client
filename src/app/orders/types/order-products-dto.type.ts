import { ProductDto } from "app/products/types/product-dto.type";
import {UUIDDto} from "../../../types/uuid-dto.type";

export interface OrderProductsDtoType extends UUIDDto  {
   product: ProductDto;
   readonly quantity: number;
}