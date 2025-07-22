import { NextRequest, NextResponse } from "next/server";
import { abacatePay } from "../../../lib/abacatepay";

export async function POST(req: NextRequest) {
  try {
    // Gerar CPF temporário (você pode ajustar conforme necessário)
    const tempTaxId = "00000000000"; // CPF temporário para teste

    // Criar cobrança no AbacatePay
    const billing = {
      frequency: 'ONE_TIME' as const,
      amount: 9700, // R$ 97,00 em centavos
      description: "Acesso à Mente - Plankton Wolf",
      customer: {
        name: "Cliente",
        cellphone: "",
        email: "",
        taxId: tempTaxId,
      },
      products: [
        {
          id: "plankton-mind-access",
          externalId: "plankton-mind-access",
          quantity: 1,
        }
      ],
      metadata: {
        redirectUrl: `${req.nextUrl.origin}/cadastro?payment=success`,
        source: "landing-page"
      }
    };

    const { data: billingResponse, error: billingError } = await abacatePay.createBilling(billing);

    if (billingError || !billingResponse) {
      console.error('Erro ao criar cobrança:', billingError);
      return NextResponse.json({ error: "Erro ao gerar cobrança" }, { status: 500 });
    }

    // Retornar a URL do checkout
    return NextResponse.json({ 
      checkoutUrl: billingResponse.url,
      billingId: billingResponse.id 
    });

  } catch (error) {
    console.error('Erro na rota de pagamento:', error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
} 