export type IVehicleFilterRequest = {
  searchTerm?: string;
  model?: string;
  brand?: string;
  cc?: string;
  weight?: string;
  vehicleType?: string;
};

export type IVehicleDetails = {
  model: string;
  brand: string;
  cc: number;
  weight: number;
  vehicleType: string;
  images: string[];
};
