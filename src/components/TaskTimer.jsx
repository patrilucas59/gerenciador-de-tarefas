import Countdown from "react-countdown";

export function TaskTimer({ minutes, startTime }) {
  const totalTime = minutes * 60 * 1000;
  const expiryTime = startTime + totalTime;
  
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) return <span className="text-white-400">Tempo esgotado</span>;
    return (
      <span className="text-black bg-white px-3 py-1 rounded-md">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    );
  };

  return <Countdown date={expiryTime} renderer={renderer} />;

}

export default TaskTimer