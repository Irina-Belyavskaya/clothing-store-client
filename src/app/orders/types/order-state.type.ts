import {BaseState} from "../../../types/base-state.type";
import { CreateOrderDtoType } from "./create-order-dto.type";
import {OrderDtoType} from "./order-dto.type";

export interface OrderStateType extends BaseState {
    orders: OrderDtoType[] | null;
    order: CreateOrderDtoType | null;
    pending: {
        orders: boolean,
        order: boolean;
    };
    errors: {
        orders: string | null,
        order: string | null;
    }
}