type KeyProps = {
  keyItem: string;
  handleClick: () => void;
  isGuessed: boolean;
  isCorrect: boolean;
  isGameOver: boolean;
};
export default function KeyItem({
  keyItem,
  handleClick,
  isGuessed,
  isCorrect,
  isGameOver,
}: KeyProps) {
  let className =
    "text-[#1E1E1E] border-2 border-[#D7D7D7] w-10 h-10 rounded-sm uppercase font-semibold disabled:opacity-50 disabled:cursor-not-allowed";

  if (isGuessed) {
    className += isCorrect ? " bg-[#10A95B]" : " bg-[#EC5D49]";
  } else {
    className += " bg-[#FCBA29]";
  }

  return (
    <button
      disabled={isGameOver}
      className={className}
      key={keyItem}
      onClick={handleClick}
    >
      {keyItem}
    </button>
  );
}
