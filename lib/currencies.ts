export const Currencies = [
  {
    value: "BRL", label: "R$ Real Brasileiro", locale: "pt-BR"
  },
  {
    value: "USD", label: "$ Dollar", locale: "en-US"
  },
  {
    value: "EUR", label: "€ Euro", locale: "de-DE"
  },
  {
    value: "GBP", label: "£ Libra", locale: "en-GB"
  },
]


// Criando e exportando a tipagem das moedas
export type Currency = typeof Currencies[0]