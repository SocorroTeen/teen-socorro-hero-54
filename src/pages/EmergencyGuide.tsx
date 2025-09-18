
import React, { useState } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { ArrowLeft, Volume2, Heart, AlertTriangle, CheckCircle } from 'lucide-react';

interface EmergencyStep {
  number: number;
  title: string;
  description: string;
  image?: string;
  warning?: string;
  tip?: string;
}

const EmergencyGuide = () => {
  const [searchParams] = useSearchParams();
  const { situacao } = useParams();
  const [isReading, setIsReading] = useState(false);

  // Get situation from URL params or search params
  const situation = situacao || searchParams.get('situacao');

  const emergencyData: Record<string, {
    title: string;
    emoji: string;
    urgency: 'high' | 'medium' | 'low';
    description: string;
    steps: EmergencyStep[];
    finalTip: string;
  }> = {
    'desmaio': {
      title: 'Pessoa Desmaiada',
      emoji: '😵',
      urgency: 'high',
      description: 'Quando alguém perde a consciência repentinamente',
      steps: [
        {
          number: 1,
          title: 'Verifique a consciência',
          description: 'Chame a pessoa pelo nome e balance levemente os ombros. Se não responder, está inconsciente.',
          warning: 'Nunca balance com força ou jogue água no rosto!'
        },
        {
          number: 2,
          title: 'Peça ajuda',
          description: 'Grite por ajuda e peça para alguém chamar o SAMU (192) ou bombeiros (193).',
          tip: 'Se estiver sozinho, use o celular no viva-voz para não deixar a pessoa sozinha.'
        },
        {
          number: 3,
          title: 'Verifique a respiração',
          description: 'Observe o peito da pessoa por 10 segundos. Veja se sobe e desce normalmente.',
          warning: 'Se não estiver respirando, inicie a RCP (massagem cardíaca)!'
        },
        {
          number: 4,
          title: 'Posição lateral de segurança',
          description: 'Se estiver respirando, vire a pessoa de lado para evitar engasgo caso vomite.',
          tip: 'Dobre o joelho de cima para dar estabilidade.'
        },
        {
          number: 5,
          title: 'Monitore constantemente',
          description: 'Fique ao lado da pessoa até a chegada do socorro, verificando sempre a respiração.',
          warning: 'Nunca deixe a pessoa sozinha!'
        }
      ],
      finalTip: '💡 Dica importante: Desmaios podem ter várias causas (calor, pressão baixa, diabetes). Sempre procure ajuda médica!'
    },
    'engasgo': {
      title: 'Engasgo',
      emoji: '🚫',
      urgency: 'high',
      description: 'Quando algo bloqueia as vias respiratórias',
      steps: [
        {
          number: 1,
          title: 'Identifique o engasgo',
          description: 'A pessoa leva as mãos ao pescoço, não consegue falar ou fazer ruído, fica roxa.',
          warning: 'Se ainda consegue tossir, deixe tossir! Não interfira.'
        },
        {
          number: 2,
          title: 'Encoraje a tosse',
          description: 'Se a pessoa ainda consegue tossir, encoraje-a a continuar tossindo com força.',
          tip: 'A tosse é o mecanismo natural mais eficaz para expelir objetos.'
        },
        {
          number: 3,
          title: 'Manobra de Heimlich',
          description: 'Se não consegue tossir: fique atrás da pessoa, abrace pela cintura, punho acima do umbigo, puxe para cima e para dentro.',
          warning: 'Faça movimentos firmes e rápidos!'
        },
        {
          number: 4,
          title: 'Continue até desobstruir',
          description: 'Repita a manobra até o objeto sair ou a pessoa conseguir respirar novamente.',
          tip: 'Se desmaiar, coloque no chão e inicie RCP.'
        }
      ],
      finalTip: '💡 Dica: Em bebês, vire de bruços no seu antebraço e dê 5 tapas nas costas!'
    },
    'crise-ansiedade': {
      title: 'Crise de Ansiedade',
      emoji: '😰',
      urgency: 'medium',
      description: 'Episódio intenso de medo e sintomas físicos',
      steps: [
        {
          number: 1,
          title: 'Mantenha a calma',
          description: 'Fique calmo e tranquilo. Sua energia influencia a pessoa em crise.',
          tip: 'Fale em tom baixo e pausado.'
        },
        {
          number: 2,
          title: 'Encontre um local calmo',
          description: 'Leve a pessoa para um ambiente mais reservado, longe de multidões.',
          warning: 'Evite locais fechados se a pessoa tem claustrofobia.'
        },
        {
          number: 3,
          title: 'Ensine respiração',
          description: 'Guie: "Inspire pelo nariz contando até 4, segure por 4, expire pela boca contando até 6".',
          tip: 'Respire junto com a pessoa para dar exemplo.'
        },
        {
          number: 4,
          title: 'Use técnica de aterramento',
          description: 'Peça para nomear: 5 coisas que vê, 4 que pode tocar, 3 que escuta, 2 que cheira, 1 que sente o gosto.',
          tip: 'Isso ajuda a pessoa a voltar ao momento presente.'
        }
      ],
      finalTip: '💡 Importante: Se os sintomas persistirem ou piorarem, procure ajuda médica!'
    },
    'corte-ferimento': {
      title: 'Cortes e Ferimentos',
      emoji: '🩹',
      urgency: 'medium',
      description: 'Primeiros cuidados com feridas e sangramento',
      steps: [
        {
          number: 1,
          title: 'Lave as mãos',
          description: 'Antes de tudo, lave bem as mãos com água e sabão ou use álcool gel.',
          warning: 'Nunca toque feridas com mãos sujas!'
        },
        {
          number: 2,
          title: 'Pare o sangramento',
          description: 'Faça pressão direta sobre o ferimento com um pano limpo ou gaze.',
          tip: 'Se o sangue atravessar, coloque mais pano por cima, não retire o primeiro.'
        },
        {
          number: 3,
          title: 'Limpe o ferimento',
          description: 'Com água limpa ou soro fisiológico, limpe suavemente ao redor da ferida.',
          warning: 'Não use álcool, água oxigenada ou iodo diretamente na ferida!'
        },
        {
          number: 4,
          title: 'Cubra a ferida',
          description: 'Use gaze estéril ou curativo limpo para cobrir o ferimento.',
          tip: 'Troque o curativo se ficar muito sujo ou molhado.'
        }
      ],
      finalTip: '💡 Procure ajuda médica se: o corte for muito profundo, não parar de sangrar ou houver sinais de infecção!'
    },
    'queimadura': {
      title: 'Queimaduras',
      emoji: '🔥',
      urgency: 'medium',
      description: 'Como tratar queimaduras de diferentes graus',
      steps: [
        {
          number: 1,
          title: 'Remova do perigo',
          description: 'Tire a pessoa da fonte de calor imediatamente.',
          warning: 'Se a roupa grudou na pele, NÃO tente tirar!'
        },
        {
          number: 2,
          title: 'Resfrie com água',
          description: 'Coloque água fria (não gelada) sobre a queimadura por 10-15 minutos.',
          tip: 'A água deve estar em temperatura ambiente, não use gelo!'
        },
        {
          number: 3,
          title: 'Cubra com pano limpo',
          description: 'Use um pano limpo e úmido para cobrir a área queimada.',
          warning: 'NUNCA use pasta de dente, manteiga ou óleo!'
        },
        {
          number: 4,
          title: 'Procure ajuda médica',
          description: 'Para queimaduras grandes ou muito dolorosas, vá ao hospital.',
          tip: 'Beba bastante água para manter-se hidratado.'
        }
      ],
      finalTip: '💡 Queimaduras de 2º e 3º grau sempre precisam de atendimento médico urgente!'
    },
    'queda-fratura': {
      title: 'Quedas e Fraturas',
      emoji: '🦴',
      urgency: 'medium',
      description: 'O que fazer em caso de quedas e possíveis fraturas',
      steps: [
        {
          number: 1,
          title: 'Não mova a pessoa',
          description: 'Se suspeitar de fratura, não tente mover a pessoa do lugar.',
          warning: 'Movimento pode piorar a lesão!'
        },
        {
          number: 2,
          title: 'Chame ajuda',
          description: 'Ligue para o SAMU (192) ou bombeiros (193) imediatamente.',
          tip: 'Anote o que aconteceu para informar aos socorristas.'
        },
        {
          number: 3,
          title: 'Imobilize se necessário',
          description: 'Se precisar mover, use talas improvisadas (jornal, madeira) para imobilizar.',
          warning: 'Só faça isso se houver risco maior em deixar a pessoa no local!'
        },
        {
          number: 4,
          title: 'Monitore sinais vitais',
          description: 'Verifique se a pessoa está consciente e respirando normalmente.',
          tip: 'Mantenha a pessoa aquecida e calma.'
        }
      ],
      finalTip: '💡 Dica: Suspeite de fratura se houver dor intensa, inchaço, deformidade ou incapacidade de movimentar!'
    },
    'intoxicacao': {
      title: 'Intoxicação',
      emoji: '☠️',
      urgency: 'high',
      description: 'Primeiros socorros em casos de intoxicação ou envenenamento',
      steps: [
        {
          number: 1,
          title: 'Identifique a substância',
          description: 'Tente descobrir o que a pessoa ingeriu, inalou ou tocou.',
          tip: 'Guarde a embalagem do produto para mostrar aos médicos.'
        },
        {
          number: 2,
          title: 'Ligue para emergência',
          description: 'Chame imediatamente o SAMU (192) ou Centro de Intoxicações.',
          warning: 'NUNCA provoque vômito sem orientação médica!'
        },
        {
          number: 3,
          title: 'Remova da exposição',
          description: 'Se for inalação, leve para local arejado. Se for na pele, lave com água abundante.',
          tip: 'Use luvas ou pano para não se contaminar também.'
        },
        {
          number: 4,
          title: 'Monitore a pessoa',
          description: 'Verifique consciência, respiração e mantenha a pessoa acordada se possível.',
          warning: 'Se desmaiar, coloque em posição lateral de segurança.'
        }
      ],
      finalTip: '💡 Centro de Informação Toxicológica: 0800 722 6001 - disponível 24h!'
    },
    'crise-epileptica': {
      title: 'Crise Epiléptica',
      emoji: '⚡',
      urgency: 'high',
      description: 'Como ajudar alguém durante uma convulsão',
      steps: [
        {
          number: 1,
          title: 'Mantenha a calma',
          description: 'Não entre em pânico. A crise geralmente dura poucos minutos.',
          warning: 'NUNCA tente segurar ou impedir os movimentos!'
        },
        {
          number: 2,
          title: 'Proteja a pessoa',
          description: 'Retire objetos perigosos ao redor e coloque algo macio embaixo da cabeça.',
          tip: 'Use sua jaqueta ou almofada para proteger a cabeça.'
        },
        {
          number: 3,
          title: 'Posicione de lado',
          description: 'Quando a convulsão parar, vire a pessoa de lado para evitar engasgo.',
          warning: 'NUNCA coloque nada na boca da pessoa!'
        },
        {
          number: 4,
          title: 'Cronometr e observe',
          description: 'Anote quanto tempo durou e o que aconteceu para informar aos médicos.',
          tip: 'Fique com a pessoa até ela ficar totalmente consciente.'
        }
      ],
      finalTip: '💡 Chame emergência se: a crise durar mais de 5 minutos, pessoa se machucar ou não recuperar consciência!'
    }
  };

  const currentEmergency = situation ? emergencyData[situation] : null;

  const readAloud = () => {
    if (!currentEmergency) return;
    
    setIsReading(true);
    const text = `${currentEmergency.title}. ${currentEmergency.description}. ${currentEmergency.steps.map(step => `Passo ${step.number}: ${step.title}. ${step.description}`).join(' ')}. ${currentEmergency.finalTip}`;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    utterance.onend = () => setIsReading(false);
    
    speechSynthesis.speak(utterance);
  };

  if (!currentEmergency) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-emergency mb-4">😅 Ops! Situação não encontrada</h1>
            <p className="text-gray-600 mb-6">Não encontramos informações sobre essa emergência.</p>
            <Link to="/primeiros-socorros" className="trust-button">
              🚑 Voltar para Primeiros Socorros
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'high': return 'border-emergency-500 bg-emergency-50';
      case 'medium': return 'border-orange-400 bg-orange-50';
      case 'low': return 'border-success-500 bg-success-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/primeiros-socorros" 
            className="flex items-center space-x-2 text-trust hover:text-trust-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </Link>
          
          <button 
            onClick={readAloud}
            disabled={isReading}
            className="flex items-center space-x-2 bg-trust text-white px-4 py-2 rounded-xl hover:bg-trust-600 disabled:opacity-50 transition-colors"
          >
            <Volume2 size={20} />
            <span>{isReading ? 'Lendo...' : 'Ouvir guia'}</span>
          </button>
        </div>

        {/* Title Section */}
        <div className={`border-2 rounded-2xl p-6 mb-8 ${getUrgencyColor(currentEmergency.urgency)}`}>
          <div className="text-center">
            <div className="text-6xl mb-4">{currentEmergency.emoji}</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              {currentEmergency.title}
            </h1>
            <p className="text-xl text-gray-600">
              {currentEmergency.description}
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-8">
          {currentEmergency.steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-trust">
              <div className="flex items-start space-x-4">
                <div className="bg-trust text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {step.warning && (
                    <div className="bg-emergency-50 border border-emergency-200 rounded-xl p-3 mb-3">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="text-emergency mt-0.5 flex-shrink-0" size={18} />
                        <p className="text-emergency-700 font-medium">
                          {step.warning}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {step.tip && (
                    <div className="bg-success-50 border border-success-200 rounded-xl p-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="text-success mt-0.5 flex-shrink-0" size={18} />
                        <p className="text-success-700 font-medium">
                          {step.tip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Tip */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
          <Heart className="text-blue-600 mx-auto mb-3" size={32} />
          <p className="text-blue-800 font-medium text-lg">
            {currentEmergency.finalTip}
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-emergency-50 border-2 border-emergency rounded-2xl p-6 mt-8">
          <h3 className="text-2xl font-bold text-emergency mb-4 text-center">
            📞 Contatos de Emergência
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl">
              <div className="text-2xl mb-2">🚑</div>
              <div className="font-bold text-emergency">SAMU</div>
              <div className="text-2xl font-bold">192</div>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="text-2xl mb-2">🚒</div>
              <div className="font-bold text-emergency">Bombeiros</div>
              <div className="text-2xl font-bold">193</div>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <div className="text-2xl mb-2">👮</div>
              <div className="font-bold text-emergency">Polícia</div>
              <div className="text-2xl font-bold">190</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmergencyGuide;
