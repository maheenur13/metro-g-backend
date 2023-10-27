import { z } from "zod";

const createBookingSchema = z.object({
    body: z.object({
        serviceAvailDate: z.string({
        required_error: 'serviceAvailDate is required',
      }),
      serviceAvailTime: z.string({
        required_error: 'serviceAvailTime is required',
      }),
      orderPlaceAt: z.string({
        required_error: 'orderPlaceAt is required',
      }),
      address: z.string({
        required_error: 'address is required',
      }),
      phoneNumber: z.string({
        required_error: 'phoneNumber type required',
      }),
      total: z.number({
        required_error: 'total is required',
      }),
      addiotionalInfo: z.string().optional(),
      customerId: z.string({
        required_error: 'customerId type required',
      }),
      serviceId: z.string({
        required_error: 'serviceId type required',
      }),
      vehicleId: z.string({
        required_error: 'vehicleId type required',
      }),
    }),
  });

  export const bookingValidationSchema = {
    createBookingSchema
  }