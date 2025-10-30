import { BaseDTO } from './base/base.dto';
import { HaircutImageDTO } from './haircut-image.dto';

export interface HaircutDTO extends BaseDTO {
  name: string;
  description: string;
  price: number;
  time: number;
  images: HaircutImageDTO[];
}
