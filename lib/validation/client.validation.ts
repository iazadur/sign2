import { z } from 'zod';

const clientValidationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters"),
    email: z.string().email("Invalid email address"),
    // telephone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid telephone number (must be in the format XXX-XXX-XXXX)"),
    telephone: z.string().min(10, "Telephone number must be at least 10 characters").max(15, "Telephone number must be at most 15 characters"),
    address: z.string().min(3, "Address must be at least 3 characters").max(255, "Address must be at most 255 characters"),
    city: z.string().min(3, "City must be at least 3 characters").max(255, "City must be at most 255 characters"),
    state: z.string().min(2, "State must be at least 2 characters").max(50, "State must be at most 50 characters"),
    zip: z.string().min(5, "Zip code must be at least 5 characters").max(10, "Zip code must be at most 10 characters"),
    claimInsurance: z.enum(["yes", "no"]),
    // contracts?: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")), // Assuming ObjectId is a 24-character hex string
});

export default clientValidationSchema;

export type ClientValidationSuccess = Omit<z.infer<typeof clientValidationSchema>, 'contracts'>;
export type ClientValidationErrors = Omit<z.inferFlattenedErrors<typeof clientValidationSchema>['fieldErrors'], 'contracts'>;