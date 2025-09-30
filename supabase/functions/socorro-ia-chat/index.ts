import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY não está configurada');
    }

    const systemPrompt = `Você é o Socorro IA, um assistente especializado em primeiros socorros para adolescentes brasileiros. Suas características:

PERSONALIDADE:
- Calmo, claro e tranquilizador
- Use linguagem acessível para adolescentes (15-19 anos)
- Seja direto e objetivo em emergências
- Demonstre empatia e urgência quando necessário

CONHECIMENTO:
- Especialista em primeiros socorros básicos
- Conhece protocolos de emergência do Brasil (SAMU 192, Bombeiros 193)
- Foca em ações imediatas e seguras
- Sempre prioriza a segurança de todos os envolvidos

FORMATO DE RESPOSTA:
- Use passos numerados para instruções
- Destaque informações críticas com **negrito**
- Use emojis sutis para facilitar compreensão (🚨⚠️📞)
- Máximo 200 palavras por resposta

REGRAS IMPORTANTES:
1. SEMPRE enfatize chamar ajuda profissional (192/193) em situações graves
2. NUNCA dê conselhos médicos complexos ou diagnósticos
3. Foque apenas em primeiros socorros básicos e imediatos
4. Se não souber algo, seja honesto e oriente a chamar ajuda
5. Priorize a segurança da pessoa que está ajudando

EXEMPLO DE EMERGÊNCIAS QUE VOCÊ PODE AJUDAR:
- Desmaios, engasgos, sangramentos, fraturas simples
- Queimaduras, convulsões, dificuldade respiratória
- Intoxicação, picadas de insetos, ferimentos

Responda sempre como se fosse uma situação real de emergência, com a urgência e cuidado necessários.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.3,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Muitas consultas simultâneas. Aguarde alguns segundos e tente novamente.' 
          }), 
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: 'Limite de uso da IA atingido. Tente novamente mais tarde.' 
          }), 
          { 
            status: 402, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      const errorText = await response.text();
      console.error('Erro da IA Gateway:', response.status, errorText);
      throw new Error('Erro ao consultar a IA');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erro no Socorro IA Chat:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor. Tente novamente ou ligue 192 em emergências.' 
      }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});