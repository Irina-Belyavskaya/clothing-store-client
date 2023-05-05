import { Column } from "types/cart-table.type";

export const columns: readonly Column[] = [
  {
    id: 'productName',
    label: 'Product',
    align: 'center',
    minWidth: 170
  },
  {
    id: 'size',
    label: 'Size',
    align: 'center',
    minWidth: 170
  },
  {
    id: 'color',
    label: 'Color',
    align: 'center',
    minWidth: 50
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];