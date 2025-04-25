// src/components/features/CountryQuiz.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX } from 'react-icons/fi';

const CountryQuiz = ({ countries }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    if (countries.length > 0) {
      generateQuestion();
    }
  }, [countries]);

  const generateQuestion = () => {
    // Reset states
    setSelectedAnswer(null);
    setResult(null);
    
    // Get random countries for options
    const shuffledCountries = [...countries].sort(() => 0.5 - Math.random());
    const questionTypes = [
      'flag',
      'capital',
      'population'
    ];
    
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    const correctAnswer = shuffledCountries[0];
    
    // Generate 3 wrong options
    const wrongOptions = shuffledCountries.slice(1, 4);
    
    // Combine and shuffle all options
    const allOptions = [correctAnswer, ...wrongOptions].sort(() => 0.5 - Math.random());
    
    let question = '';
    switch (questionType) {
      case 'flag':
        question = 'Which country does this flag belong to?';
        break;
      case 'capital':
        question = `${correctAnswer.capital?.[0] || 'This capital city'} is the capital of which country?`;
        break;
      case 'population':
        question = `Which country has a population of approximately ${new Intl.NumberFormat().format(correctAnswer.population)}?`;
        break;
      default:
        question = 'Which country is this?';
    }
    
    setCurrentQuestion({
      type: questionType,
      text: question,
      correctAnswer,
      flagUrl: questionType === 'flag' ? correctAnswer.flags.svg : null
    });
    
    setOptions(allOptions);
  };

  const handleAnswer = (country) => {
    setSelectedAnswer(country);
    
    const isCorrect = country.cca3 === currentQuestion.correctAnswer.cca3;
    setResult(isCorrect);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setQuestionCount(prev => prev + 1);
    
    // Move to next question after a delay
    setTimeout(() => {
      generateQuestion();
    }, 2000);
  };

  if (!currentQuestion) return null;

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Country Quiz</h3>
        <div className="text-sm">
          Score: <span className="font-bold">{score}/{questionCount}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-lg mb-4">{currentQuestion.text}</p>
        
        {currentQuestion.type === 'flag' && currentQuestion.flagUrl && (
          <div className="w-full max-w-xs mx-auto h-32 mb-4">
            <img 
              src={currentQuestion.flagUrl} 
              alt="Flag" 
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {options.map((country) => (
          <motion.button
            key={country.cca3}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectedAnswer === null && handleAnswer(country)}
            className={`p-3 rounded-lg text-left transition-colors ${
              selectedAnswer?.cca3 === country.cca3
                ? result
                  ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500'
                  : 'bg-red-100 dark:bg-red-900 border-2 border-red-500'
                : currentQuestion.correctAnswer.cca3 === country.cca3 && selectedAnswer !== null
                ? 'bg-green-100 dark:bg-green-900 border-2 border-green-500'
                : 'bg-light-card dark:bg-dark-card hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            disabled={selectedAnswer !== null}
          >
            <div className="flex items-center justify-between">
              <span>{country.name.common}</span>
              <AnimatePresence>
                {selectedAnswer?.cca3 === country.cca3 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`p-1 rounded-full ${
                      result ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}
                  >
                    {result ? <FiCheck /> : <FiX />}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CountryQuiz;
