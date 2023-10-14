import { VehicleType } from '@prisma/client';

export type IVehicleFilterRequest = {
  searchTerm?: string;
  model?: string;
  brand?: string;
  cc?: string;
  weight?: string;
  type?: string;
};

export type IVehicleDetails = {
  model: string;
  brand: string;
  cc: string;
  weight: number;
  type: VehicleType;
  images: string[];
};
