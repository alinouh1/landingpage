'use client';

import { useState } from 'react';
import './FAQ.css';
import './animations.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  number?: string;
}

interface FAQCategory {
  title: string;
  icon: string;
  items: FAQItem[];
}

interface FAQProps {
  categories: FAQCategory[];
  featured?: FAQItem;
  showSearch?: boolean;
  layout?: 'accordion' | 'cards';
}

export default function FAQ({ 
  categories, 
  featured, 
  showSearch = true,
  layout = 'accordion' 
}: FAQProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string>('all');

  const toggleItem = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.includes(searchTerm) || 
      item.answer.includes(searchTerm)
    )
  })).filter(category => category.items.length > 0);

  const allTags = ['all', ...categories.map(cat => cat.title)];

  return (
    <div className="faq-container">
      <div className="faq-header fade-in-up">
        <h2 className="faq-title">الأسئلة الشائعة</h2>
        <p className="faq-subtitle">
          إجابات على الأسئلة الأكثر شيوعاً حول منتجات وخدمات Snooze
        </p>
      </div>

      {showSearch && (
        <div className="faq-search fade-in-up">
          <input
            type="text"
            placeholder="ابحثي عن سؤال..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="faq-search-icon">🔍</span>
        </div>
      )}

      <div className="faq-tags fade-in-up">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`faq-tag ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag === 'all' ? 'الكل' : tag}
          </button>
        ))}
      </div>

      {featured && (
        <div className="faq-featured fade-in-up">
          <div className="faq-featured-question">
            <span className="faq-featured-icon">⭐</span>
            {featured.question}
          </div>
          <div className="faq-featured-answer">
            {featured.answer}
          </div>
        </div>
      )}

      {filteredCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="faq-category fade-in-up">
          <h3 className="faq-category-title">
            <span className="faq-category-icon">{category.icon}</span>
            {category.title}
          </h3>

          {layout === 'accordion' ? (
            category.items.map((item) => (
              <div
                key={item.id}
                className={`faq-item ${activeItem === item.id ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleItem(item.id)}
                >
                  <span className="faq-question-text">{item.question}</span>
                  {item.number && (
                    <span className="faq-question-number">{item.number}</span>
                  )}
                  <span className="faq-toggle">▼</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-content">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))
          ) : (
            category.items.map((item) => (
              <div key={item.id} className="faq-card">
                <div className="faq-card-question">
                  {item.number && (
                    <span className="faq-card-question-number">{item.number}</span>
                  )}
                  {item.question}
                </div>
                <div className="faq-card-answer">
                  {item.answer}
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}