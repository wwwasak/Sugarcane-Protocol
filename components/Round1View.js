import { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Vibration } from 'react-native';
import Countdown from '../utils/countdown';
import TrainingContext from './TrainingContext';

const Round1View = ({ navigation }) => {
  const { duration, setRound1Distance,PATTERN } = useContext(TrainingContext);
  const [timerStarted, setTimerStarted] = useState(false);
  const [buttonText, setButtonText] = useState('Start');
  const [isCanceled, setIsCanceled] = useState(false);
  const handleToggleTimer = () => {
    if (timerStarted) {
      setIsCanceled(true);
      setTimerStarted(false);
      setButtonText('Start');
    } else {
      setTimerStarted(true);
      setButtonText('Cancel');
      setIsCanceled(false);
    }
  };

  const handleRound1Finished = () => {
    setIsCanceled(true);
    navigation.navigate('Rest1');
    Vibration.cancel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round 1</Text>
      <Text style={styles.text}>
        Begin by covering the maximum distance possible within {duration} minutes.
      </Text>
      {timerStarted && <Countdown duration={duration * 60} isCanceled={isCanceled} onEnd={() => Vibration.vibrate(PATTERN, true)} />}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Distance Covered (meters):</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRound1Distance(parseInt(text))}
          placeholder="Enter distance (in meters)"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={buttonText} onPress={handleToggleTimer} color="#841584" />
        <Button title="Finished" onPress={handleRound1Finished} color="#841584" />
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
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Round1View;
