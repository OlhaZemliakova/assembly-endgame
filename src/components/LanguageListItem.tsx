type LanguageListItemProps = {
  name: string;
  backgroundColor: string;
  color: string;
  isLost: boolean;
};

export default function LanguageListItem({
  name,
  backgroundColor,
  color,
  isLost,
}: LanguageListItemProps) {
  return (
    <span
      style={{
        backgroundColor: backgroundColor,
        color: color,
      }}
      className={`rounded-sm p-2 ${isLost ? "relative before:absolute before:inset-0 before:flex before:items-center before:justify-center before:content-['☠️'] grayscale brightness-75" : ""}`}
    >
      {name}
    </span>
  );
}
