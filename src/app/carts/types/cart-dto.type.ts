import {UUIDDto} from "../../../types/uuid-dto.type";
import {UserProductDtoType} from "./user-product-dto.type";

export interface CartDtoType extends UUIDDto  {
    products: UserProductDtoType;
    quantity: number;
}