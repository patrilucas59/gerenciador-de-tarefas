import Countdown from "react-countdown";
import { motion } from 'framer-motion';
import { useMemo, useCallback } from "react";

export function TaskTimer({ minutes, startTime }) {
  const totalTime = useMemo(() => minutes * 60 * 1000, [minutes]);
  const expiryTime = useMemo(() => startTime + totalTime, [startTime, totalTime]);
  
  const renderer = useCallback(({ minutes, seconds, completed, total }) => {
    if (completed) {
      return (
      <span className="text-white">
        Tempo esgotado!
      </span>
      );
    }

    const percent = total / totalTime;

    const statusColor = 
      percent < 0.1 ? "bg-red-500 text-white"
      : percent < 0.2 ? "bg-yellow-500 text-black"
      : "bg-white text-black";

    return (
      <motion.span
        animate={{
          scale: percent < 0.1 ? [1, 1.1, 1]: 1,
        }}
        transition={{ duration: 0.5, repeat: percent < 0.1 ? Infinity : 0 }} 
        className={`${statusColor} px-4 py-2 rounded-xl text-lg`}
        >
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </motion.span>
    );
  }, [totalTime]);

  return <Countdown date={expiryTime} renderer={renderer} intervalDelay={1000} />;

}

export default TaskTimer