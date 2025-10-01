import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface Scenario {
  id: number;
  title: string;
  emoji: string;
  description: string;
  situation: string;
  steps: Array<{
    step: number;
    action: string;
    options: string[];
    correct: number;
    feedback: {
      correct: string;
      incorrect: string;
    };
  }>;
}

const Simulador = () => {
  // Scroll para o topo quando a página carrega
  useScrollToTop();
  
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const scenarios: Scenario[] = [
    {
      id: 1,
      title: "Amigo Desmaiou na Escola",
      emoji: "😵",
      description: "Seu amigo desmaiou durante o recreio",
      situation: "Você está no pátio da escola quando vê seu amigo desmaiar de repente. Há muitos estudantes ao redor e você precisa agir rapidamente.",
      steps: [
        {
          step: 1,
          action: "Primeira ação: O que você faz imediatamente?",
          options: [
            "Grito por ajuda e verifico se meu amigo responde",
            "Jogo água no rosto dele",
            "Tento levantar ele imediatamente",
            "Saio correndo para buscar um professor"
          ],
          correct: 0,
          feedback: {
            correct: "Perfeito! 🎉 Chamar ajuda e verificar responsividade é sempre o primeiro passo!",
            incorrect: "Ops! 😅 Primeiro devemos chamar ajuda e verificar se a pessoa responde. Nunca deixe a vítima sozinha! 💡 Converse com o SOCORRO IA para aprender mais."
          }
        },
        {
          step: 2,
          action: "Seu amigo não responde, mas está respirando. Qual sua próxima ação?",
          options: [
            "Coloco ele de lado (posição lateral de segurança)",
            "Deixo ele deitado de costas",
            "Sento ele encostado na parede",
            "Levanto ele para caminhar"
          ],
          correct: 0,
          feedback: {
            correct: "Excelente! 🌟 A posição lateral de segurança evita que a pessoa engasgue caso vomite!",
            incorrect: "Cuidado! 😰 Quando alguém está inconsciente mas respirando, a posição lateral de segurança é mais segura! 💡 Converse com o SOCORRO IA para aprender o passo correto."
          }
        }
      ]
    },
    {
      id: 2,
      title: "Engasgo no Lanche",
      emoji: "🚫",
      description: "Alguém está engasgando na cantina",
      situation: "Durante o almoço, você vê uma pessoa na mesa ao lado começar a engasgar com a comida. Ela está tossindo e levando as mãos ao pescoço.",
      steps: [
        {
          step: 1,
          action: "A pessoa está tossindo. O que você faz?",
          options: [
            "Encorajo ela a continuar tossindo e fico ao lado",
            "Bato nas costas com força",
            "Aplico a manobra de Heimlich imediatamente",
            "Dou água para ela beber"
          ],
          correct: 0,
          feedback: {
            correct: "Isso mesmo! 👏 Se a pessoa ainda consegue tossir, deixe-a continuar - a tosse pode expelir o objeto!",
            incorrect: "Atenção! 🚨 Se a pessoa ainda tosse, não interfira! A tosse é o mecanismo natural do corpo para expelir objetos! 💡 Converse com o SOCORRO IA para entender melhor."
          }
        },
        {
          step: 2,
          action: "A pessoa parou de tossir e não consegue mais respirar. Agora sim você deve:",
          options: [
            "Aplicar a manobra de Heimlich (compressões abdominais)",
            "Continuar batendo nas costas",
            "Dar água",
            "Chamar alguém e esperar"
          ],
          correct: 0,
          feedback: {
            correct: "Perfeito! 🎯 Quando a pessoa não consegue mais tossir ou respirar, a manobra de Heimlich é essencial!",
            incorrect: "Cuidado! ⚠️ Quando há obstrução total (pessoa não consegue respirar), apenas a manobra de Heimlich pode salvar! 💡 Converse com o SOCORRO IA para aprender o passo a passo correto."
          }
        }
      ]
    },
    {
      id: 3,
      title: "Parada Cardíaca no Jogo",
      emoji: "💔",
      description: "Um aluno caiu desacordado e não está respirando",
      situation: "Durante uma partida de futebol, um colega cai no chão e não se move. Você se aproxima e percebe que ele não responde e não está respirando normalmente.",
      steps: [
        {
          step: 1,
          action: "O que você faz primeiro?",
          options: [
            "Grito por ajuda, chamo o 192 (SAMU) e inicio massagem cardíaca",
            "Tento dar respiração boca a boca",
            "Jogo água no rosto dele",
            "Espero alguém mais velho chegar"
          ],
          correct: 0,
          feedback: {
            correct: "Excelente! 🚨 Chamar ajuda e iniciar RCP imediatamente é crucial em parada cardíaca!",
            incorrect: "Atenção! 💔 Em parada cardíaca, cada segundo conta! Chame o 192 e inicie a massagem cardíaca! 💡 Converse com o SOCORRO IA para aprender RCP."
          }
        },
        {
          step: 2,
          action: "Como fazer a massagem cardíaca correta?",
          options: [
            "Pressiono o centro do peito com força, 100-120 vezes por minuto",
            "Pressiono levemente para não machucar",
            "Alterno entre pressionar peito e barriga",
            "Espero o SAMU chegar"
          ],
          correct: 0,
          feedback: {
            correct: "Perfeito! 💪 Compressões rápidas e fortes no centro do peito mantêm o sangue circulando!",
            incorrect: "Cuidado! A massagem cardíaca precisa ser forte e rápida! 💡 Converse com o SOCORRO IA para praticar mentalmente."
          }
        }
      ]
    },
    {
      id: 4,
      title: "Crise Epiléptica na Sala de Aula",
      emoji: "⚡",
      description: "Um colega começou a ter convulsões durante a aula",
      situation: "Durante a aula, você vê um colega cair da cadeira e começar a ter movimentos involuntários (convulsões). Todo mundo fica assustado.",
      steps: [
        {
          step: 1,
          action: "O que você NÃO deve fazer durante a convulsão?",
          options: [
            "Afasto objetos perigosos e protejo a cabeça dele",
            "Tento segurar os movimentos dele com força",
            "Coloco algo na boca para não morder a língua",
            "Jogo água no rosto"
          ],
          correct: 0,
          feedback: {
            correct: "Correto! ✅ Proteger a pessoa de machucados é a prioridade. Nunca segure ou coloque nada na boca!",
            incorrect: "Cuidado! ⚡ NUNCA segure a pessoa ou coloque objetos na boca durante convulsão! 💡 Converse com o SOCORRO IA para saber o que fazer."
          }
        },
        {
          step: 2,
          action: "A convulsão parou. O que fazer agora?",
          options: [
            "Coloco a pessoa de lado e aguardo ela acordar, chamando ajuda",
            "Tento acordar a pessoa imediatamente",
            "Dou água para ela beber",
            "Levanto ela para caminhar"
          ],
          correct: 0,
          feedback: {
            correct: "Perfeito! 🌟 Posição lateral é segura enquanto a pessoa se recupera da convulsão!",
            incorrect: "Atenção! Após convulsão, a pessoa precisa de tempo. Posição lateral é essencial! 💡 Converse com o SOCORRO IA para entender melhor."
          }
        }
      ]
    },
    {
      id: 5,
      title: "Queda com Possível Fratura",
      emoji: "🦴",
      description: "Um estudante caiu da escada e não consegue se levantar",
      situation: "Você vê um colega cair de alguns degraus da escada. Ele está no chão, consciente, mas gritando de dor e não consegue mover uma das pernas.",
      steps: [
        {
          step: 1,
          action: "Qual a primeira ação correta?",
          options: [
            "Peço para ele não se mexer e chamo ajuda imediatamente",
            "Ajudo ele a levantar devagar",
            "Puxo a perna dele para ver se está quebrada",
            "Peço para ele tentar andar"
          ],
          correct: 0,
          feedback: {
            correct: "Excelente! 🎯 Em suspeita de fratura, imobilizar e não mover é fundamental!",
            incorrect: "Cuidado! 🦴 NUNCA mova alguém com suspeita de fratura! Pode piorar muito! 💡 Converse com o SOCORRO IA para saber como agir."
          }
        },
        {
          step: 2,
          action: "Enquanto espera ajuda, o que você pode fazer?",
          options: [
            "Acalmo a pessoa e imobilizo a região com objetos ao redor",
            "Massageio a perna dolorida",
            "Coloco gelo diretamente na pele",
            "Tento empurrar o osso de volta no lugar"
          ],
          correct: 0,
          feedback: {
            correct: "Muito bem! 👏 Acalmar e imobilizar com cuidado ajuda até a chegada do socorro!",
            incorrect: "Atenção! Nunca mexa na fratura! Apenas acalme e imobilize! 💡 Converse com o SOCORRO IA para aprender imobilização."
          }
        }
      ]
    },
    {
      id: 6,
      title: "Intoxicação Acidental",
      emoji: "☠️",
      description: "Um amigo bebeu um produto de limpeza por engano",
      situation: "Você está na casa de um amigo quando ele, por engano, bebe de uma garrafa que continha produto de limpeza. Ele começa a sentir dor e náusea.",
      steps: [
        {
          step: 1,
          action: "O que fazer IMEDIATAMENTE?",
          options: [
            "Ligo para o 192 (SAMU) ou Centro de Intoxicação e não dou nada para beber",
            "Faço ele vomitar imediatamente",
            "Dou leite para neutralizar",
            "Dou água com sal"
          ],
          correct: 0,
          feedback: {
            correct: "Perfeito! 📞 Ligar para especialistas é crucial! Nunca provoque vômito sem orientação!",
            incorrect: "Cuidado! ☠️ NUNCA induza vômito! Produtos químicos podem queimar ainda mais ao voltar! 💡 Converse com o SOCORRO IA para saber o protocolo."
          }
        },
        {
          step: 2,
          action: "O que fazer enquanto espera o socorro?",
          options: [
            "Mantenho a pessoa calma, em posição confortável e guardo a embalagem do produto",
            "Dou comida para absorver o veneno",
            "Faço a pessoa correr para acelerar a eliminação",
            "Aplico massagem na barriga"
          ],
          correct: 0,
          feedback: {
            correct: "Excelente! 🌟 Manter calma e guardar a embalagem ajuda os profissionais no tratamento!",
            incorrect: "Atenção! Não dê comida ou faça movimentos! Mantenha calma e guarde a embalagem! 💡 Converse com o SOCORRO IA para mais orientações."
          }
        }
      ]
    }
  ];

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;
    
    setSelectedOption(optionIndex);
    setShowFeedback(true);
    
    if (optionIndex === selectedScenario!.steps[currentStep].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < selectedScenario!.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsCompleted(true);
    }
  };

  const resetSimulation = () => {
    setSelectedScenario(null);
    setCurrentStep(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setIsCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / selectedScenario!.steps.length) * 100;
    if (percentage === 100) return "🏆 Socorrista Expert! Você salvou a situação!";
    if (percentage >= 50) return "👍 Bom trabalho! Continue praticando!";
    return "💪 Não desista! Tente novamente para melhorar!";
  };

  // Completion Screen
  if (isCompleted && selectedScenario) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">
                {score === selectedScenario.steps.length ? "🎉" : "👍"}
              </div>
              <h1 className="text-4xl font-bold mb-4 text-trust">
                Simulação Concluída!
              </h1>
              
              <div className="text-5xl font-bold text-emergency mb-4">
                {score}/{selectedScenario.steps.length}
              </div>
              
              <p className="text-xl text-gray-600 mb-6">
                {getScoreMessage()}
              </p>
              
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <h3 className="text-lg font-bold mb-2">📊 Resumo:</h3>
                <p className="text-gray-700">
                  Você completou o cenário "{selectedScenario.title}" e tomou as decisões corretas em{" "}
                  <span className="font-bold text-trust">{score}</span> de{" "}
                  <span className="font-bold">{selectedScenario.steps.length}</span> situações.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={resetSimulation}
                  className="trust-button text-lg py-4 px-8"
                >
                  🔄 Tentar Outro Cenário
                </button>
                <button 
                  onClick={() => window.location.href = '/quiz'}
                  className="success-button text-lg py-4 px-8"
                >
                  ❓ Fazer Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Scenario in progress
  if (selectedScenario) {
    const currentStepData = selectedScenario.steps[currentStep];
    
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">{selectedScenario.emoji}</div>
              <h1 className="text-3xl font-bold text-trust mb-2">
                {selectedScenario.title}
              </h1>
              <p className="text-gray-600">{selectedScenario.situation}</p>
            </div>
            
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Passo {currentStep + 1} de {selectedScenario.steps.length}
                </span>
                <span className="text-sm font-medium text-trust">
                  Acertos: {score}/{currentStep + (showFeedback ? 1 : 0)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-trust h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentStep + 1) / selectedScenario.steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Current Step */}
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {currentStepData.action}
              </h2>

              {/* Options */}
              <div className="space-y-4 mb-6">
                {currentStepData.options.map((option, index) => {
                  let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ";
                  
                  if (showFeedback) {
                    if (index === currentStepData.correct) {
                      buttonClass += "bg-success-100 border-success text-success-700 font-semibold";
                    } else if (index === selectedOption) {
                      buttonClass += "bg-emergency-100 border-emergency text-emergency-700";
                    } else {
                      buttonClass += "bg-gray-100 border-gray-200 text-gray-500";
                    }
                  } else {
                    buttonClass += "bg-white border-gray-200 hover:border-trust hover:bg-trust-50 text-gray-700 hover:scale-102 cursor-pointer";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={showFeedback}
                      className={buttonClass}
                    >
                      <span className="font-medium mr-3">
                        {String.fromCharCode(65 + index)})
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border ${selectedOption === currentStepData.correct ? 'bg-success-50 border-success' : 'bg-orange-50 border-orange-400'}`}>
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">
                        {selectedOption === currentStepData.correct ? "✅" : "📚"}
                      </div>
                      <div>
                        <p className="text-gray-700">
                          {selectedOption === currentStepData.correct 
                            ? currentStepData.feedback.correct 
                            : currentStepData.feedback.incorrect}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={handleNext}
                      className="trust-button text-lg py-3 px-8"
                    >
                      {currentStep < selectedScenario.steps.length - 1 ? "Próximo Passo" : "Finalizar"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Scenario selection
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-trust mb-4">
            🎮 Simulador Interativo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pratique situações reais de primeiros socorros em um ambiente seguro! 
            Escolha um cenário e tome as melhores decisões.
          </p>
        </div>

        {/* Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              onClick={() => setSelectedScenario(scenario)}
              className="bg-white p-8 rounded-2xl shadow-lg cursor-pointer card-hover"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{scenario.emoji}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {scenario.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {scenario.description}
                </p>
                <div className="text-trust font-semibold">
                  🎯 {scenario.steps.length} decisões para tomar
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="bg-blue-50 p-6 rounded-2xl mt-12 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-xl font-bold mb-2 text-blue-800">Como Funciona?</h3>
            <p className="text-blue-700">
              Cada cenário apresenta situações reais onde você deve tomar decisões. 
              Você receberá feedback imediato e aprenderá as melhores práticas de primeiros socorros!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Simulador;
