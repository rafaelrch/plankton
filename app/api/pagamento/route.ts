import { NextRequest, NextResponse } from "next/server";
import { abacatePay } from "../../../lib/abacatepay";

export async function POST(req: NextRequest) {
  try {
    console.log('Iniciando criação de cobrança...');
    
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

    console.log('Dados da cobrança:', JSON.stringify(billing, null, 2));

    const { data: billingResponse, error: billingError } = await abacatePay.createBilling(billing);

    console.log('Resposta do AbacatePay:', { billingResponse, billingError });

    if (billingError || !billingResponse) {
      console.error('Erro ao criar cobrança:', billingError);
      return NextResponse.json({ 
        error: "Erro ao gerar cobrança", 
        details: billingError 
      }, { status: 500 });
    }

    console.log('Cobrança criada com sucesso:', billingResponse.id);

    // Retornar a URL do checkout
    return NextResponse.json({ 
      checkoutUrl: billingResponse.url,
      billingId: billingResponse.id 
    });

  } catch (error) {
    console.error('Erro na rota de pagamento:', error);
    return NextResponse.json({ 
      error: "Erro interno do servidor",
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
} 