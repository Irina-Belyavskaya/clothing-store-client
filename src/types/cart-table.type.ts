export interface Column {
  id: 'productName' | 'price' | 'quantity';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}