import {UUIDDto} from "../../../types/uuid-dto.type";
import {OrderProductsDtoType} from "./order-products-dto.type";

export interface OrderDtoType extends UUIDDto  {
    products: OrderProductsDtoType[];
    totalPrice: number;
}