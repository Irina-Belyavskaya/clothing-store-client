import { useAppDispatch } from "hooks/redux";
import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { logOutUser } from "./store/auth.actions";
import { useAuthSelector } from "./store/auth.selectors";
import Cookies from 'js-cookie';

export default function AuthLogOutPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {token, pending} = useAuthSelector();

  useEffect(() => {
    dispatch(logOutUser());
  }, [])

  useEffect(() => {
    if (!Cookies.get('access_token_client')) {
      navigate('/', { replace: true });
    }
  }, [token, pending.token])

  return(<></>);
}