const ABACATE_API_URL = 'https://api.abacatepay.com';
const ABACATE_TOKEN = process.env.ABACATE_TOKEN || 'abc_dev_Y1JJq0AwmTr4UX6ytEBTq5nc';

// Validar se o token está configurado
if (!ABACATE_TOKEN) {
  console.error('ABACATE_TOKEN não está configurado nas variáveis de ambiente');
}

export interface AbacateCustomer {
  name: string;
  cellphone: string;
  email: string;
  taxId: string;
}

export interface AbacateBilling {
  frequency: 'ONE_TIME';
  amount: number;
  description: string;
  customer: AbacateCustomer;
  products: Array<{
    id: string;
    externalId: string;
    quantity: number;
  }>;
  metadata?: Record<string, any>;
}

export interface AbacateResponse<T> {
  data: T;
  error: string | null;
}

export interface BillingResponse {
  id: string;
  url: string;
  amount: number;
  status: string;
  devMode: boolean;
  methods: string[];
  products: Array<{
    id: string;
    externalId: string;
    quantity: number;
  }>;
  frequency: string;
  customer: {
    id: string;
    metadata: AbacateCustomer;
  };
}

class AbacatePayAPI {
  private token: string;
  private baseURL: string;

  constructor(token: string, baseURL: string = ABACATE_API_URL) {
    this.token = token;
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<AbacateResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    console.log('Fazendo requisição para:', url);
    console.log('Token usado:', this.token.substring(0, 10) + '...');
    
    const config: RequestInit = {
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${this.token}`,
        'content-type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      console.log('Resposta da API:', { status: response.status, data });
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('AbacatePay API Error:', error);
      throw error;
    }
  }

  async createBilling(billing: AbacateBilling): Promise<AbacateResponse<BillingResponse>> {
    return this.request<BillingResponse>('/v1/billing/create', {
      method: 'POST',
      body: JSON.stringify(billing),
    });
  }

  async checkBillingStatus(billingId: string): Promise<AbacateResponse<{ status: string }>> {
    return this.request<{ status: string }>(`/v1/billing/check?id=${billingId}`);
  }
}

export const abacatePay = new AbacatePayAPI(ABACATE_TOKEN); 