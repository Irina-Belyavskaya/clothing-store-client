import { Column } from "types/cart-table.type";

export const columns: readonly Column[] = [
  {
      id: 'productName',
      label: 'Product',
      minWidth: 170
  },
  {
      id: 'price',
      label: 'Price',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
  },
  {
      id: 'quantity',
      label: 'Quantity',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
  },
];