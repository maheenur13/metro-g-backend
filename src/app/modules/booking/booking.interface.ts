export type IBookingPayload = {
    serviceAvailDate: string;
    serviceAvailTime: string;
    orderPlaceAt: "SERVICE_POINT" | "AT_HOME";
    address: string;
    phoneNumber: string;
    total: number;
    addiotionalInfo: string;
    customerId: string;
    serviceId: string;
    vehicleId: string;
  };
  