import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  emoji: string;
}

const Quiz = () => {
  // Scroll para o topo quando a página carrega
  useScrollToTop();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "O que você deve fazer PRIMEIRO ao encontrar alguém desmaiado?",
      options: [
        "Jogar água no rosto da pessoa",
        "Verificar se a pessoa responde e se o local é seguro",
        "Dar tapinhas no rosto",
        "Levantar a pessoa imediatamente"
      ],
      correct: 1,
      explanation: "Sempre verifique a responsividade e a segurança do local antes de qualquer ação! 🛡️",
      emoji: "😵"
    },
    {
      id: 2,
      question: "Uma pessoa está engasgada e não consegue falar. O que fazer?",
      options: [
        "Dar água para ela beber",
        "Aplicar a manobra de Heimlich (compressões abdominais)",
        "Bater nas costas com força",
        "Colocar o dedo na boca para tirar o objeto"
      ],
      correct: 1,
      explanation: "A manobra de Heimlich é a técnica mais eficaz para desobstruir as vias aéreas! 🫁",
      emoji: "🚫"
    },
    {
      id: 3,
      question: "Em caso de sangramento intenso, qual é a prioridade?",
      options: [
        "Lavar o ferimento com água",
        "Aplicar pressão direta sobre o ferimento",
        "Colocar gelo sobre o machucado",
        "Elevar sempre a parte machucada"
      ],
      correct: 1,
      explanation: "Pressão direta é fundamental para controlar hemorragias! Use um pano limpo. 🩸",
      emoji: "🩸"
    },
    {
      id: 4,
      question: "Alguém está tendo uma crise de ansiedade. Como ajudar?",
      options: [
        "Falar 'calma, não é nada'",
        "Ajudar a pessoa a respirar lenta e profundamente",
        "Dar água gelada",
        "Deixar a pessoa sozinha"
      ],
      correct: 1,
      explanation: "Respiração controlada é essencial! Conte: inspire 4, segure 4, expire 6. 😰",
      emoji: "😰"
    },
    {
      id: 5,
      question: "Em uma queimadura leve, qual é o primeiro cuidado?",
      options: [
        "Passar pasta de dente",
        "Resfriar com água corrente fria por 10-15 minutos",
        "Estourar as bolhas",
        "Passar manteiga ou óleo"
      ],
      correct: 1,
      explanation: "Água fria remove o calor e alivia a dor. Nunca use receitas caseiras! 🔥",
      emoji: "🔥"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "🏆 Socorrista Teen Expert! Você arrasou!";
    if (percentage >= 60) return "🥉 Socorrista Teen! Muito bem, continue praticando!";
    if (percentage >= 40) return "📚 Quase lá! Estude um pouco mais e tente novamente!";
    return "💪 Não desista! Estude o conteúdo e tente novamente!";
  };

  const getScoreEmoji = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "🎉";
    if (percentage >= 60) return "😊";
    if (percentage >= 40) return "🤔";
    return "😅";
  };

  if (showResult) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="text-6xl mb-4">{getScoreEmoji()}</div>
              <h1 className="text-4xl font-bold mb-4 text-trust">
                Quiz Finalizado!
              </h1>
              
              <div className="text-6xl font-bold text-emergency mb-4">
                {score}/{questions.length}
              </div>
              
              <p className="text-xl text-gray-600 mb-6">
                {getScoreMessage()}
              </p>
              
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <h3 className="text-lg font-bold mb-2">🎯 Seu Desempenho:</h3>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className="bg-success h-4 rounded-full transition-all duration-1000" 
                    style={{ width: `${(score / questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {Math.round((score / questions.length) * 100)}% de acertos
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={resetQuiz}
                  className="trust-button text-lg py-4 px-8"
                >
                  🔄 Tentar Novamente
                </button>
                <button 
                  onClick={() => window.location.href = '/simulador'}
                  className="success-button text-lg py-4 px-8"
                >
                  🎮 Ir para Simulador
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-trust mb-4">❓ Quiz Socorro Teen</h1>
            <p className="text-xl text-gray-600">
              Teste seus conhecimentos em primeiros socorros!
            </p>
          </div>
          
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm font-medium text-trust">
                Score: {score}/{currentQuestion + (answered ? 1 : 0)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-trust h-3 rounded-full transition-all duration-300" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">{currentQ.emoji}</div>
              <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {currentQ.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ";
                
                if (answered) {
                  if (index === currentQ.correct) {
                    buttonClass += "bg-success-100 border-success text-success-700 font-semibold";
                  } else if (index === selectedAnswer) {
                    buttonClass += "bg-emergency-100 border-emergency text-emergency-700";
                  } else {
                    buttonClass += "bg-gray-100 border-gray-200 text-gray-500";
                  }
                } else {
                  buttonClass += "bg-white border-gray-200 hover:border-trust hover:bg-trust-50 text-gray-700";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answered}
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

            {/* Explanation */}
            {answered && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-bold text-blue-800 mb-1">Explicação:</h4>
                    <p className="text-blue-700">{currentQ.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Next indicator */}
          {answered && currentQuestion < questions.length - 1 && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-gray-600">
                <span>Próxima pergunta em</span>
                <div className="w-6 h-6 border-2 border-trust border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Quiz;
