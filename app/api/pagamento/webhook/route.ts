import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log('Webhook AbacatePay recebido:', body);

    // Verificar se é uma confirmação de pagamento
    if (body.event === 'billing.paid' || body.status === 'paid') {
      const billingId = body.id || body.billingId;
      const redirectUrl = body.metadata?.redirectUrl;
      
      console.log(`Pagamento confirmado: ${billingId}`);
      console.log(`Redirect URL: ${redirectUrl}`);

      // O usuário será redirecionado para a página de cadastro
      // O status de pagamento será marcado durante o cadastro
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
} 