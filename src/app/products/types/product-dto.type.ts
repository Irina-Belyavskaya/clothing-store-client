import { UUIDDto } from "types/uuid-dto.type";
import { SizesNames } from "../enums/sizes.enum";

export interface ProductDto extends UUIDDto  {
  name: string;
  price: number;
  vendorCode: number;
  color: string;
  size: SizesNames;
  composition: string;
  description: string;
  quantity: number;
  brand: string;
  image: string;
  categoryId: number;
}