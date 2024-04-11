import { createContext, useState } from 'react';

const TrainingContext = createContext();

export const TrainingProvider = ({ children }) => {
  const [exerciseType, setExerciseType] = useState('');
  const [duration, setDuration] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [round1Distance, setRound1Distance] = useState(0);
  const [round2Time, setRound2Time] = useState(0);
  const [round3Distance, setRound3Distance] = useState(0);
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const ONE_SECOND_IN_MS = 400;
  const PATTERN = [
    2 * ONE_SECOND_IN_MS,
    6 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
  ];
  return (
    <TrainingContext.Provider
      value={{
        formatTime,
        PATTERN,
        ONE_SECOND_IN_MS,
        exerciseType,
        setExerciseType,
        duration,
        setDuration,
        restTime,
        setRestTime,
        round1Distance,
        setRound1Distance,
        round2Time,
        setRound2Time,
        round3Distance,
        setRound3Distance
      }}>
      {children}
    </TrainingContext.Provider>
  );
};

export default TrainingContext;
