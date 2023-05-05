import { BaseState } from "types/base-state.type";
import {CartDtoType} from "./cart-dto.type";
import { AddProductToCartDtoType } from "./add-product-to-cart-dto.type";

export interface UserCartStateType extends BaseState {
    userCart: CartDtoType[] | null;
    productInCart: AddProductToCartDtoType | null;
    pending: {
        userCart: boolean;
        productInCart: boolean;
    };
    errors: {
        userCart: string | null;
        productInCart: string | null;
    }
}