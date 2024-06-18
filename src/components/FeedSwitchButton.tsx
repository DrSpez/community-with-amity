const FeedSwitchButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button className="feed-tab" onClick={onClick}>
      {text}
    </button>
  );
};

export default FeedSwitchButton;
