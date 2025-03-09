export function translateProductStatusToPortuguese(
  status: "available" | "sold" | "cancelled"
) {
  switch (status) {
    case "available":
      return "Anunciado";
    case "sold":
      return "Vendido";
    case "cancelled":
      return "Desativado";
  }
}
