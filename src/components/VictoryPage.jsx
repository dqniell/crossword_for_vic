import { useState, useRef } from 'react';
import './VictoryPage.css';

const yourPhoto = '/bon.jpg';
const envelopeImage = '/envelope.png';

export default function VictoryPage() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesClicked, setYesClicked] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const noButtonRef = useRef(null);
  const containerRef = useRef(null);

  const moveNoButton = () => {
    const padding = 80;
    const buttonWidth = 120;
    const buttonHeight = 50;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const avoidWidth = 400;
    const avoidHeight = 500;

    let newX, newY;
    let attempts = 0;

    do {
      newX = padding + Math.random() * (window.innerWidth - buttonWidth - padding * 2);
      newY = padding + Math.random() * (window.innerHeight - buttonHeight - padding * 2);
      attempts++;
    } while (
      attempts < 50 &&
      newX > centerX - avoidWidth / 2 &&
      newX < centerX + avoidWidth / 2 - buttonWidth &&
      newY > centerY - avoidHeight / 2 &&
      newY < centerY + avoidHeight / 2 - buttonHeight
    );

    setNoPosition({ x: newX, y: newY });
    setNoAttempts(prev => prev + 1);
  };

  const handleNoMouseEnter = () => {
    moveNoButton();
  };

  const handleYesClick = () => {
    setYesClicked(true);
  };

  const handleEnvelopeClick = () => {
    setEnvelopeOpened(true);
  };


  // Sparkle emojis to scatter
  const sparkles = ['✨', '💖', '💗', '🌸', '💕', '⭐', '🦋'];

  if (yesClicked) {
    return (
      <div className="victory-celebration">
        <div className="hearts-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="floating-heart" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
              fontSize: `${18 + Math.random() * 28}px`
            }}>
              {sparkles[i % sparkles.length]}
            </div>
          ))}
        </div>

        {!envelopeOpened ? (
          <div className="envelope-container" onClick={handleEnvelopeClick}>
            <p className="tap-hint">tap to open~!</p>
            <div className="envelope-emoji">💌</div>
            <img
              src={envelopeImage}
              alt="Love letter envelope"
              className="envelope-image"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        ) : (
          <div className="letter-container">
            <div className="letter-content">
              <div className="letter-header">💕</div>
              <h1 className="letter-title">Dear Pook,</h1>
              <p className="letter-message">
                I love you so much! 💖
              </p>
              <p className="letter-message">
                Thank u for being my pook.
              </p>
              <p className="letter-message">
                I could nawt find a resy for Nubiani so I just did Sam Sunny. 6:30pm.
              </p>
              <p className="letter-message">
                I love you!
              </p>
              <p className="letter-signature">
                Love,<br/>
                Bub 🐻
              </p>
              <div className="letter-hearts">💕 💕 💕</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="victory-page" ref={containerRef}>
      {/* Background sparkles */}
      <div className="bg-sparkles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-sparkle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            fontSize: `${12 + Math.random() * 16}px`
          }}>
            {sparkles[i % sparkles.length]}
          </div>
        ))}
      </div>

      <div className="victory-content">
        <p className="congrats-text">omg u did it!!</p>
        <div className="victory-photo-container">
          <img
            src={yourPhoto}
            alt="A special photo for you"
            className="victory-photo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="photo-fallback" style={{ display: 'none' }}>
            <h1 className="victory-title">yaaay u did it!!</h1>
          </div>
        </div>

        <div className="question-box">
          <h2 className="the-question">will u be my valentine?? 💝</h2>

          <div className="button-container">
            <button
              className="yes-button"
              onClick={handleYesClick}
            >
              Yes!! 💕
            </button>

            <button
              ref={noButtonRef}
              className="no-button"
              onMouseEnter={handleNoMouseEnter}
              onTouchStart={handleNoMouseEnter}
              style={noAttempts > 0 ? {
                position: 'fixed',
                left: `${noPosition.x}px`,
                top: `${noPosition.y}px`,
                transition: 'all 0.1s ease-out',
                zIndex: 10000
              } : {}}
            >
              no :(
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
