import Countdown from "react-countdown";

export function TaskTimer({ minutes }) {
  const expiryTime = Date.now() + minutes * 60 * 1000;

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) return <span className="text-white-400">Tempo esgotado!</span>;
    return (
      <span>
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    );
  };

  return <Countdown date={expiryTime} renderer={renderer} />;
}


export default TaskTimer