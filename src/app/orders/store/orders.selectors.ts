import {useAppSelector} from "../../../hooks/redux";

export const useOrderSelector = () => useAppSelector(state => state.userOrderReducer);