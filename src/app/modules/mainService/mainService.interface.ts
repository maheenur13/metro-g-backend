export type IServiceFilterRequest = {
  searchTerm?: string;
  title?: string;
  price?: string;
  rating?: string;
  categoryId?: string;
  vehicleId?: string;
};

export type IService = {
  title: string;
  details: string;
  description: string;
  price: number;
  rating: number;
  categoryId: string;
  vehicleIds: IVehicleRequest[];
};

export type IVehicleRequest = {
  vehicleId: string;
};
