'use client';

import { useState } from 'react';
import './Questions.css';
import './animations.css';

interface Question {
  id: number;
  number: string;
  title: string;
  description?: string;
  options: {
    id: string;
    text: string;
    value: number;
  }[];
}

interface QuestionsProps {
  questions: Question[];
  onComplete?: (answers: Record<number, string>) => void;
}

export default function Questions({ questions, onComplete }: QuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
      if (onComplete) {
        onComplete(answers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentAnswer = answers[questions[currentQuestion].id];

  if (showResults) {
    const answeredCount = Object.keys(answers).length;
    const score = Math.round((answeredCount / questions.length) * 100);

    return (
      <div className="questions-container">
        <div className="results-container fade-in-up">
          <div className="score-badge">نتائج الاستبيان</div>
          <h2 className="results-title">شكراً لمشاركتك!</h2>
          <div className="results-score">{answeredCount}/{questions.length}</div>
          <p className="results-message">
            لقد أجبتِ على {answeredCount} من أصل {questions.length} أسئلة
          </p>
          
          <div className="results-details">
            <h3 style={{
              color: '#28353e',
              marginBottom: '20px',
              fontSize: '1.3rem',
              fontWeight: '600'
            }}>
              إجاباتك:
            </h3>
            {questions.map((question) => {
              const answerId = answers[question.id];
              const answer = question.options.find(opt => opt.id === answerId);
              
              return (
                <div key={question.id} className="result-item">
                  <span className="result-question">{question.title}</span>
                  <span className="result-answer">
                    {answer ? answer.text : 'لم يتم الإجابة'}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleRestart}
            className="nav-button primary"
            style={{ marginTop: '30px' }}
          >
            إعادة الاستبيان
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="questions-container">
      <div className="progress-text">
        السؤال {currentQuestion + 1} من {questions.length}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="question-card fade-in-up">
        <div className="question-header">
          <div className="question-number">{question.number}</div>
          <h3 className="question-title">{question.title}</h3>
        </div>

        {question.description && (
          <p className="question-description">{question.description}</p>
        )}

        <div className="options-container">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`option-item ${currentAnswer === option.id ? 'selected' : ''}`}
              onClick={() => handleAnswer(question.id, option.id)}
            >
              <div className="option-radio" />
              <span className="option-text">{option.text}</span>
            </div>
          ))}
        </div>

        <div className="navigation-buttons">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="nav-button secondary"
          >
            السابق
          </button>
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="nav-button primary"
          >
            {currentQuestion === questions.length - 1 ? 'إنهاء' : 'التالي'}
          </button>
        </div>
      </div>
    </div>
  );
}