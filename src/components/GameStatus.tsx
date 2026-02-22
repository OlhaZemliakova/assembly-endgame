type GameStatusProps = {
  title: string;
  description: string;
  isGameOver: boolean;
  isVisible: boolean;
  farewellText: string;
  wonGame: boolean;
};
export default function GameStatus({
  title,
  description,
  isGameOver,
  isVisible,
  farewellText,
  wonGame,
}: GameStatusProps) {
  let className =
    "max-w-sm w-full text-center p-1.5 rounded-sm mb-8 min-h-[60px] transition-all";

  if (!isVisible) {
    className += " opacity-0";
  } else if (wonGame) {
    className += " bg-[#10A95B] opacity-100";
  } else if (isGameOver) {
    className += " bg-[#BA2A2A] opacity-100";
  } else if (farewellText) {
    className += " bg-[#7A5EA7]";
  }

  const isFarewellActive = !wonGame && !isGameOver && farewellText.length > 0;

  return (
    <div
      className={`${className} transition-opacity duration-500
    ${isFarewellActive ? "opacity-100 animate-pulse transform -translate-y-1" : "opacity-0"}
  `}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
