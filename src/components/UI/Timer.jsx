import { useEffect, useState } from "react";

const Timer = ({expiryDate}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  let time = (expiryDate-Date.now())/1000
  const countdown = () => {
    if (time >= 0) {
      const seconds = Math.floor(time % 60);
      const minutes = Math.floor((time / 60) % 60);
      const hours = Math.floor((time / 3600) % 24);
      setTimeLeft({ hours, minutes, seconds });
      time = time - 1;
    }
  };
  useEffect(() => {
    countdown();
    const interval = setInterval(() => countdown(), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="de_countdown">
      {timeLeft.hours == 0 && timeLeft.minutes == 0 && timeLeft.seconds == 0
        ? "EXPIRED"
        : `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
    </div>
  );
};

export default Timer;
