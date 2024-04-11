import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Timer = ({ onPause }) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false); 

  useEffect(() => {
    let interval = null;
    if (isActive) { 
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      onPause(seconds);
    }

    return () => clearInterval(interval);
  }, [isActive,onPause, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const clearTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}> {minutes < 10 ? '0' : ''}{minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</Text>
      <View style={styles.buttonContainer}>
        <Button title={isActive ? 'Pause' : 'Start'} onPress={toggleTimer} color="#841584" />
        <Button title="Clear" onPress={clearTimer} color="#841584" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 50,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20, 
    marginHorizontal: 40, 
  },
});

export default Timer;
