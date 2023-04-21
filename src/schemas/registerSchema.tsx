import { TypeOf, z } from "zod";

export const RegisterSchema = z
  .object({
    name: z.string().min(3, "Nome obrigatório"),
    email: z.string().email("O e-mail é obrigatório"),
    password: z
      .string()
      .min(7, "A senha é obrigatória e precisa de no mínimo 7 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z]).+$/,
        "É necessário pelo menos uma letra maiúscula e pelo menos uma letra minúscula"
      )
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
      .regex(
        /(?=.*?[@#$!%&?+/])/,
        "É necessário pelo menos um destes símbolos: (@, #, $, !, %, &, ?, +, /)"
      ),
    confirmPassword: z.string().min(1, "Confirmação de senha"),
  })
  .refine(({ password, confirmPassword }) => confirmPassword === password, {
    message: "Senhas distintas",
    path: ["confirmPassword"],
  });

export type TRegisterFormValue = z.infer<typeof RegisterSchema>;
