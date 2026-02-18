import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export const useTypewriter = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 1500,
}: UseTypewriterOptions) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');

  const currentWord = words[wordIndex];
  const displayText = currentWord.slice(0, charIndex);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === 'typing') {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 0);
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), pauseDuration);
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), deletingSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, phase, currentWord, words.length, typingSpeed, deletingSpeed, pauseDuration]);

  return { displayText, wordIndex };
};
