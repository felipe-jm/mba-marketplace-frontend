import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { attachments } from "@/api/attachments";
import { createProduct } from "@/api/create-product";
import { getCategories } from "@/api/get-categories";
import { Button } from "@/components/button";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { Textarea } from "@/components/textarea";

const newProductForm = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  priceInCents: z
    .string({ required_error: "O preço é obrigatório." })
    .min(1, { message: "O preço é obrigatório." }),
  description: z.string().min(1, { message: "A descrição é obrigatória." }),
  categoryId: z
    .string({ required_error: "A categoria é obrigatória." })
    .min(1, { message: "A categoria é obrigatória." }),
  attachmentsIds: z
    .array(z.string(), { required_error: "A imagem é obrigatória." })
    .length(1, { message: "A imagem é obrigatória." }),
});

type NewProductForm = z.infer<typeof newProductForm>;

export function NewProductForm() {
  const navigate = useNavigate();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { mutateAsync: uploadImage } = useMutation({
    mutationFn: attachments,
  });

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
  });

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<NewProductForm>({
    resolver: zodResolver(newProductForm),
  });

  async function handleCreateProduct(data: NewProductForm) {
    try {
      const sanitizedPriceString = data.priceInCents
        .replace(/\./g, "")
        .replace(",", ".");
      const convertedPriceInCents = parseFloat(sanitizedPriceString) * 100;

      await createProductFn({
        ...data,
        priceInCents: convertedPriceInCents,
      });

      navigate("/products");

      toast.success("Produto criado com sucesso.");
    } catch {
      toast.error("Houve um erro ao criar o produto.");
    }
  }

  async function handleUploadImage(file: File | null) {
    try {
      if (!file) return;

      const response = await uploadImage({ files: [file] });

      setValue(
        "attachmentsIds",
        response.data.attachments.map((item: { id: string }) => item.id)
      );

      toast.success("Imagem enviada com sucesso.");
    } catch {
      toast.error("Erro ao fazer upload da imagem.");
    }
  }

  return (
    <form className="flex gap-6" onSubmit={handleSubmit(handleCreateProduct)}>
      <div className="max-w-lg w-full h-full">
        <ImageUpload
          onFileSelect={handleUploadImage}
          className="w-full h-96"
          label="Selecione a imagem do produto"
          error={errors.attachmentsIds?.message}
        />
      </div>

      <div className="flex flex-col w-full p-8 bg-shape-white rounded-[20px]">
        <p className="text-title-sm font-sans font-bold text-grayscale-300">
          Dados do produto
        </p>

        <div className="mt-8 flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <Input
              label="Título"
              placeholder="Nome do produto"
              error={errors.title?.message}
              {...register("title")}
            />
            <Input
              label="Valor"
              placeholder="0,00"
              currency
              error={errors.priceInCents?.message}
              {...register("priceInCents")}
            />
          </div>
          <Textarea
            label="Descrição"
            placeholder="Escreva detalhes sobre o produto, tamanho, características"
            rows={4}
            error={errors.description?.message}
            {...register("description")}
          />

          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select
                label="Categoria"
                options={categories || []}
                error={errors.categoryId?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex items-center gap-3 mt-10">
          <Button
            type="submit"
            size="lg"
            variant="outline"
            className="w-full justify-center"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </Button>
          <Button
            size="lg"
            className="w-full justify-center"
            disabled={isSubmitting}
          >
            Salvar e publicar
          </Button>
        </div>
      </div>
    </form>
  );
}
