import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [pleadingMessage, setPleadingMessage] = useState('');
  const [noAttempts, setNoAttempts] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const pleadingMessages = [
    "Please say yes 🥺",
    "pretty please 💛",
    "You sure? I promise I'll make you smile 😊",
    "Please? 🙏",
    "Pretty please with a cherry on top? 🍒",
    "Please reconsider? 💕",
    "I really hope you'll say yes 🌟",
    "Please, just give it a chance? 🌸",
    "Please think about it 💭",
    "Please, it would mean the world to me ✨",
    "Please don't say no 🥺",
    "Please, I'm being sincere 💖",
    "Please say yes, I promise it'll be worth it 😊",
    "Please? I'll be waiting 🌺"
  ];

  useEffect(() => {
    if (pleadingMessage) {
      const timer = setTimeout(() => {
        setPleadingMessage('');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [pleadingMessage]);

  const moveNoButton = () => {
    if (!containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();

    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 40;

    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    setNoButtonPosition({ x: newX, y: newY });
    
    const messageIndex = noAttempts % pleadingMessages.length;
    setPleadingMessage(pleadingMessages[messageIndex]);
    setNoAttempts(prev => prev + 1);
  };

  const handleYes = () => {
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950/20 dark:via-pink-950/20 dark:to-purple-950/20 p-4 overflow-hidden">
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground animate-scale-in">
              Thankkk youuuu thankkkk youuu veryyyy muchhh 💛💛💛
            </h1>
          </div>
          <div className="hearts-container">
            {[...Array(12)].map((_, i) => (
              <Heart
                key={i}
                className="floating-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
                fill="currentColor"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950/20 dark:via-pink-950/20 dark:to-purple-950/20 p-4 relative overflow-hidden"
    >
      <div className="max-w-2xl w-full space-y-12 text-center">
        <div className="space-y-6 animate-fade-in">
          <div className="inline-block p-4 bg-rose-100 dark:bg-rose-900/30 rounded-full mb-4">
            <Heart className="w-12 h-12 text-rose-500 dark:text-rose-400" fill="currentColor" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Hey Shuchi..
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
            I know it is a very sudden confession.. but I just wanna tell you that.. I have loved you since 6th.. it's been 4 years.. I never had the courage to say it face to face.. but just wanna ask that.. will you like to know me.. yes or no?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative min-h-[120px]">
          <Button
            onClick={handleYes}
            size="lg"
            className="text-lg px-12 py-6 bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Yes! 💕
          </Button>

          <Button
            ref={noButtonRef}
            onClick={moveNoButton}
            size="lg"
            variant="outline"
            className="text-lg px-12 py-6 border-2 transition-all duration-300 hover:scale-105"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            No
          </Button>
        </div>

        {pleadingMessage && (
          <div className="animate-fade-in">
            <p className="text-lg text-rose-600 dark:text-rose-400 font-medium">
              {pleadingMessage}
            </p>
          </div>
        )}
      </div>

      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground">
          © 2025. Built with <Heart className="inline w-4 h-4 text-rose-500" fill="currentColor" /> using{' '}
          <a 
            href="https://caffeine.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-rose-500 hover:text-rose-600 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
