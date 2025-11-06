import { SpecialtyDTO } from './specialty.dto';

export interface BarberDTO {
  id: string;
  name: string;
  description: string;
  userId: string;
  specialties: SpecialtyDTO[];
}
