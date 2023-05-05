import {useAppSelector} from "../../../hooks/redux";

export const useUserCartSelector = () => useAppSelector(state => state.userCartReducer);