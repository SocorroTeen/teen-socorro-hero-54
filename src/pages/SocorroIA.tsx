import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Heart, AlertTriangle, Zap, Ban, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface EmergencyButton {
  id: string;
  emoji: string;
  title: string;
  description: string;
  instructions: string;
}

const emergencyButtons: EmergencyButton[] = [
  {
    id: 'desmaio',
    emoji: '😵',
    title: 'Desmaio',
    description: 'Pessoa perdeu a consciência',
    instructions: `
**DESMAIO - O que fazer:**

1. **Verifique a consciência** - Toque no ombro e chame pelo nome
2. **Posicione a pessoa** - Deite-a de costas, eleve as pernas 30cm
3. **Libere as vias aéreas** - Afrouxe roupas apertadas no pescoço
4. **Monitore a respiração** - Observe se está respirando normalmente
5. **Não dê água ou comida** - Pessoa inconsciente pode engasgar
6. **Chame ajuda** - Se não acordar em 2 minutos, ligue 192

⚠️ **NUNCA** balance ou sacuda uma pessoa desmaiada!
`
  },
  {
    id: 'engasgo',
    emoji: '🚫',
    title: 'Engasgo',
    description: 'Dificuldade para respirar',
    instructions: `
**ENGASGO - Manobra de Heimlich:**

1. **Fique atrás da pessoa** - Se ela estiver consciente e de pé
2. **Posicione as mãos** - Uma mão fechada no abdômen, entre umbigo e costelas
3. **Comprima** - Pressione com movimentos rápidos para dentro e para cima
4. **Repita** - Até 5 vezes ou até o objeto sair

**Se a pessoa estiver inconsciente:**
- Deite-a de costas
- Faça compressões no peito (como RCP)
- Verifique a boca antes de tentar respiração

📞 **Ligue 192 imediatamente!**
`
  },
  {
    id: 'parada-cardiaca',
    emoji: '💔',
    title: 'Parada Cardíaca',
    description: 'Pessoa não responde nem respira',
    instructions: `
**PARADA CARDÍACA - RCP (Reanimação):**

1. **Verifique consciência** - Toque e grite com a pessoa
2. **Chame ajuda** - Ligue 192 IMEDIATAMENTE
3. **Posicione as mãos** - Centro do peito, entre os mamilos
4. **Comprima forte e rápido** - 5-6cm de profundidade, 100-120/min
5. **Conte em voz alta** - "1, 2, 3..." até 30 compressões
6. **Ventilação** - 2 respirações boca a boca (se souber)
7. **Continue** - 30 compressões + 2 respirações até ajuda chegar

⚡ **Não pare até os profissionais chegarem!**
`
  },
  {
    id: 'crise-epileptica',
    emoji: '⚡',
    title: 'Crise Epiléptica',
    description: 'Movimentos involuntários',
    instructions: `
**CRISE EPILÉPTICA - Como ajudar:**

1. **Mantenha a calma** - Não entre em pânico
2. **Proteja a pessoa** - Afaste objetos que podem machucá-la
3. **Posicione de lado** - Para evitar engasgo com saliva
4. **Não segure** - Nunca tente impedir os movimentos
5. **Não coloque nada na boca** - Risco de engasgo
6. **Cronometrе** - Anote duração da crise
7. **Fique ao lado** - Até a pessoa se recuperar

📞 **Ligue 192 se:**
- Crise durar mais de 5 minutos
- Pessoa se machucar
- Não recuperar consciência
`
  }
];

const SocorroIA: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState<EmergencyButton | null>(null);
  const { toast } = useToast();

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('socorro-ia-chat', {
        body: { 
          message: message,
          context: 'socorro_teen_primeiros_socorros'
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erro ao consultar IA:', error);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível consultar a IA. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleEmergencyClick = (emergency: EmergencyButton) => {
    setSelectedEmergency(emergency);
  };

  const handleQuickHelp = (emergency: EmergencyButton) => {
    const quickMessage = `Preciso de ajuda com ${emergency.title.toLowerCase()}: ${emergency.description.toLowerCase()}`;
    sendMessage(quickMessage);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emergency mb-4">🤖 SOCORRO IA</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Receba orientações educativas de emergência com auxílio da inteligência artificial. 
            <strong className="text-emergency"> Este espaço não substitui atendimento médico profissional.</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chat Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-trust">
                  <Heart className="w-5 h-5" />
                  Chat com Socorro IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Chat Messages */}
                <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto border">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <Heart className="w-8 h-8 mx-auto mb-2 text-trust" />
                      <p>Descreva sua situação de emergência...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-trust text-white'
                                : 'bg-white border border-gray-200'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                            <p className="text-sm text-gray-500">Socorro IA está digitando...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Descreva a situação (ex: 'meu amigo desmaiou', 'alguém está engasgado')"
                    className="min-h-[80px] resize-none"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    disabled={!inputMessage.trim() || isLoading}
                    className="w-full bg-emergency hover:bg-emergency-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Pedir Ajuda
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Buttons Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-trust">🚨 Emergências Rápidas</h2>
            
            <div className="grid gap-4">
              {emergencyButtons.map((emergency) => (
                <Card key={emergency.id} className="card-hover border-2 border-gray-200 hover:border-emergency">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{emergency.emoji}</span>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{emergency.title}</h3>
                          <p className="text-sm text-gray-600">{emergency.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => handleEmergencyClick(emergency)}
                          variant="outline"
                          size="sm"
                          className="text-trust border-trust hover:bg-trust hover:text-white"
                        >
                          Ver Instruções
                        </Button>
                        <Button
                          onClick={() => handleQuickHelp(emergency)}
                          size="sm"
                          className="bg-emergency hover:bg-emergency-600 text-white"
                        >
                          Pedir Ajuda IA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Instructions Modal */}
        {selectedEmergency && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2 text-emergency">
                  <span className="text-2xl">{selectedEmergency.emoji}</span>
                  {selectedEmergency.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {selectedEmergency.instructions}
                  </pre>
                </div>
                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={() => setSelectedEmergency(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Fechar
                  </Button>
                  <Button
                    onClick={() => {
                      handleQuickHelp(selectedEmergency);
                      setSelectedEmergency(null);
                    }}
                    className="flex-1 bg-emergency hover:bg-emergency-600"
                  >
                    Conversar com IA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-6 border-l-4 border-emergency">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-emergency mt-1 flex-shrink-0" />
            <div className="space-y-4">
              <p className="text-gray-800 font-semibold">
                ⚠️ <strong>IMPORTANTE:</strong> As informações fornecidas pela IA têm caráter educativo e não substituem atendimento profissional. 
                Em situações graves, ligue imediatamente para o SAMU (192) ou procure ajuda médica.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <Card className="border-emergency-100 bg-emergency-50">
                  <CardContent className="p-4 text-center">
                    <Phone className="w-6 h-6 mx-auto text-emergency mb-2" />
                    <h4 className="font-bold text-emergency">SAMU</h4>
                    <p className="text-2xl font-bold text-emergency">192</p>
                  </CardContent>
                </Card>
                
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4 text-center">
                    <Zap className="w-6 h-6 mx-auto text-orange-600 mb-2" />
                    <h4 className="font-bold text-orange-700">Bombeiros</h4>
                    <p className="text-2xl font-bold text-orange-700">193</p>
                  </CardContent>
                </Card>
                
                <Card className="border-trust-200 bg-trust-50">
                  <CardContent className="p-4 text-center">
                    <Heart className="w-6 h-6 mx-auto text-trust mb-2" />
                    <h4 className="font-bold text-trust">Emergência</h4>
                    <p className="text-2xl font-bold text-trust">911</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SocorroIA;