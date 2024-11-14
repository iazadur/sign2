import { z } from 'zod';

export const contractList = [
    { id: "ewr-work-authorization", label: "Ewr work Autho" },
    { id: "aob-direct-bill", label: "AOB/Direct Bill" },
    { id: "poop-rebuild", label: "Poop Rebuild" },
    { id: "aob-poop-rebuild", label: "AOB Poop rebuild" },
    { id: "pack-out-cps", label: "Pack out CPS" },
    { id: "aob-cps", label: "AOB CPS" },
    { id: "asbestos-form", label: "Asbestos Form" },
    { id: "aob-asbestos-form", label: "AOB Asbestos Form" },
    { id: "trash-dumpster-rental", label: "Trash /Dumpster rental" },
    { id: "amartt-air-mold-asbestos", label: "Amartt air.mold.asbestos" },
    { id: "trailer-rental", label: "Trailer rental" },
    { id: "off-site-storage-rental", label: "Off site Storage rental" },
    { id: "price-list-ewr", label: "Price list for EWR" },
] as const;

const itemIds = contractList.map(item => item.id) as [string, ...string[]];

export const ContractValidationSchema = z.object({
    contract: z.array(z.enum(itemIds)),
    contractType:z.enum(['sign-now','email-sign'])
});

// error types
export type ContractError = z.inferFlattenedErrors<typeof ContractValidationSchema>["fieldErrors"];
