export interface Column {
  id: 'productName' | 'price' | 'quantity' | 'size' | 'color';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}