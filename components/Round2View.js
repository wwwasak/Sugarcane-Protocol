import {useContext,useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TrainingContext from './TrainingContext';
import Timer from '../utils/countTimer';

const Round2View = ({ navigation }) => {
  const {formatTime,round1Distance, setRound2Time } = useContext(TrainingContext);
const [pausedSeconds, setPausedSeconds] = useState(0);
 const handlePause = (seconds) => {
    setPausedSeconds(seconds);
    setRound2Time(seconds);
  };
  const handleRound2Finished = () => {
    navigation.navigate('Rest2');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round 2</Text>
      <View style={styles.timerContainer}>
        <Timer onPause={handlePause}/>
      </View>
      <Text style={styles.text}>
        Cover the same distance as in Round 1 ({round1Distance} meters), but this time the time taken doesn't matter.
      </Text>
      <View style={styles.inputContainer}>
  <Text style={styles.label}>Time Taken:</Text>
  <Text style={styles.input}>{formatTime(pausedSeconds)}</Text>
</View>
      <View style={styles.buttonContainer}>
        <Button title="Finished" onPress={handleRound2Finished} color="#841584" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timerContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#841584',
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  buttonContainer: {
    width: '100%',
  },
});

export default Round2View;
