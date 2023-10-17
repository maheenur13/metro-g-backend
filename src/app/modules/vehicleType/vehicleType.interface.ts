export type IVehicleTypeFilterRequest = {
  searchTerm?: string;

  type?: string;
};

export type IVehiclesPayload = {
  type: 'BIKE' | 'CAR';
};
