import { useState, useEffect } from "react";
import GameStatus from "./components/GameStatus";
import KeyItem from "./components/KeyItem";
import LanguageListItem from "./components/LanguageListItem";
import { languages } from "./data/language";
import getRandomWord, { getFarewellText } from "./utils";

function App() {
  const [word, setWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [farewellText, setFarewellText] = useState("");

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !word.includes(letter),
  ).length;

  const numberOfAttempts = languages.length - 1;
  const gameOver = wrongGuessCount >= numberOfAttempts;
  const uniqueLetters = [...new Set(word)];
  const wonGame = uniqueLetters.every((letter) =>
    guessedLetters.includes(letter),
  );
  const isGameFinished = gameOver || wonGame;

  useEffect(() => {
    if (!gameOver && !wonGame && wrongGuessCount > 0) {
      const lostLanguage = languages[wrongGuessCount - 1];
      if (lostLanguage) {
        const text = getFarewellText(lostLanguage.name);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFarewellText(text);
      }
    }
  }, [wrongGuessCount, gameOver, wonGame]);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const letters = word.split("");

  const hasGuesses = guessedLetters.length > 0;

  const statusTitle = gameOver
    ? "Game over!"
    : wonGame
      ? "You win!"
      : farewellText
        ? "Oops!"
        : "";

  const statusDescription = gameOver
    ? "You lose! Better start learning Assembly 😭"
    : wonGame
      ? "Well done! 🎉"
      : farewellText;

  function userGuesses(value: string) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(value) ? prevLetters : [...prevLetters, value],
    );
  }

  function newGame() {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setFarewellText("");
  }

  return (
    <>
      <header className="text-center font-medium max-w-sm mx-auto mb-8">
        <h1 className="text-xl text-[#f9f4da]">Assembly: Endgame</h1>
        <p className="text-sm text-[#8E8E8E]">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <main className="flex flex-col items-center">
        <GameStatus
          title={statusTitle}
          description={statusDescription}
          isGameOver={gameOver}
          isVisible={hasGuesses}
          farewellText={farewellText}
          wonGame={wonGame}
        />
        <div className="flex flex-wrap gap-2 max-w-xs w-full justify-center mb-8">
          {languages.map((language, index) => {
            const isLost = index < wrongGuessCount;
            return (
              <LanguageListItem
                key={language.name}
                {...language}
                isLost={isLost}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2 max-w-md mb-8">
          {letters.map((letter, index) => {
            const isGuessed = guessedLetters.includes(letter);
            const shouldReveal = isGuessed || gameOver;
            const colorClass =
              gameOver && !isGuessed ? "text-[#EC5D49]" : "text-[#F9F4DA]";
            return (
              <span
                key={index}
                className={`flex bg-[#323232] border-b-2 border-[#F9F4DA] w-10 h-10 items-center justify-center uppercase ${colorClass}`}
              >
                {shouldReveal ? letter : ""}
              </span>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-md mb-8">
          {alphabet.split("").map((key) => {
            const isGuessed = guessedLetters.includes(key);
            const isCorrect = word.includes(key);
            return (
              <KeyItem
                key={key}
                keyItem={key}
                handleClick={() => userGuesses(key)}
                isGuessed={isGuessed}
                isCorrect={isCorrect}
                isGameOver={gameOver}
              />
            );
          })}
        </div>
        <div className="h-[40px] flex justify-center items-center mb-8">
          <button
            onClick={newGame}
            className={`px-3 py-2 bg-[#11B5E5] rounded-sm transition-opacity duration-300
      ${isGameFinished ? "opacity-100" : "opacity-0 pointer-events-none"}
    `}
          >
            New Game
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
