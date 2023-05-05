import {ReactNode} from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import HomeIcon from '@mui/icons-material/Home';

type NavParams = {
    icon: ReactNode;
    text: string;
    navigatePath: string;
}

export const nav: Array<NavParams> = [
    {icon: <AccountBoxIcon/>, text: 'Profile', navigatePath: '/app/users'},
    {icon: <AttachMoneyIcon/>, text: 'Orders', navigatePath: '/app/users/orders'},
    {icon: <ShoppingCartIcon/>, text: 'Cart', navigatePath: '/app/users/carts'},
    {icon: <SettingsSuggestIcon/>, text: 'Settings', navigatePath: '/app/users/settings'},
    {icon: <HomeIcon/>, text: 'Main', navigatePath: '/app'},
];