import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().min(1, "Pesquise aqui..."),
});

export type TSearchFormValue = z.infer<typeof searchSchema>;
