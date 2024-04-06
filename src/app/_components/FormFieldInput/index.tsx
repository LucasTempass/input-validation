"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ControlledInput } from "@/app/_components/ControlledInput";
import { toast } from "@/components/ui/use-toast";

const POSITIVE_NEGATIVE_INTEGER_REGEX = /^-?\d+$/;

const DATE_PATTERN_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const IP_V4_ADDRESS_REGEX = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

const FormSchema = z.object({
  date: z.string().regex(DATE_PATTERN_REGEX, {
    message: "Este campo deve seguir o padrão de data DD/MM/AAAA.",
  }),
  integer: z.string().regex(POSITIVE_NEGATIVE_INTEGER_REGEX, {
    message: "Este campo deve ser um número inteiro.",
  }),
  cpf: z.string().regex(CPF_REGEX, {
    message: "Este campo deve seguir o formato do CPF.",
  }),
  ip: z.string().regex(IP_V4_ADDRESS_REGEX, {
    message: "Este campo deve seguir o formato de um endereço de IPV4.",
  }),
  cpfFilter: z.string().transform((value) => value.replace(/\D/g, "")),
});

export function FormFields() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: "",
      integer: "",
      cpf: "",
      ip: "",
      cpfFilter: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Dados enviados.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <ControlledInput
          label="Data"
          placeholder="DD/MM/AAAA"
          control={form.control}
          name="date"
        />

        <ControlledInput
          label="Número inteiro"
          placeholder="Número inteiro"
          control={form.control}
          name="integer"
        />

        <ControlledInput
          label="CPF (com expressão regular)"
          placeholder="000.000.000-00"
          control={form.control}
          name="cpf"
        />

        <ControlledInput
          label="Endereço de IP"
          placeholder="000.000.000.000"
          control={form.control}
          name="ip"
        />

        <ControlledInput
          label="CPF (com filtragem)"
          placeholder="CPF"
          control={form.control}
          description="Campo permite todos caracteres, mas filtra para apenas números."
          name="cpfFilter"
        />

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
