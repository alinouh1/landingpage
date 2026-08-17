'use client';

import { useState, useEffect } from 'react';
import './slider.css';
import './animations.css';

interface Slide {
  title: string;
  description: string;
  buttonText?: string;
  image?: string;
}

interface SliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Slider({ slides, autoPlay = true, autoPlayInterval = 5000 }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval]);

  return (
    <div className="slider-container">
      <div 
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <div className={`slide-content ${index === currentSlide ? 'fade-in-up' : ''}`}>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              {slide.image && (
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="slide-image"
                />
              )}
              {slide.buttonText && (
                <button className="slide-button">
                  {slide.buttonText}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="slider-arrow prev" onClick={prevSlide}>
        ‹
      </button>
      <button className="slider-arrow next" onClick={nextSlide}>
        ›
      </button>

      <div className="slider-navigation">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}