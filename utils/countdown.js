import { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Countdown = ({ duration, isCanceled, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isCanceled) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerRef.current);
            onEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isCanceled, duration, onEnd]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  return (
    <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
  );
};

const styles = StyleSheet.create({
  timer: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#841584',
  },
});

export default Countdown;
