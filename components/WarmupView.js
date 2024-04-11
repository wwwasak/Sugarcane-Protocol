import { useState,useContext } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Vibration, Alert } from 'react-native';
import Countdown from '../utils/countdown';
import TrainingContext from './TrainingContext';
  
const WarmupView = ({ navigation }) => {
  const { PATTERN } = useContext(TrainingContext);
  const [warmupDuration, setWarmupDuration] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [buttonText, setButtonText] = useState('Start');
  const [isCanceled, setIsCanceled] = useState(false);

  const handleToggleTimer = () => {
    if (timerStarted) {
      setIsCanceled(true);
      setTimerStarted(false);
      setButtonText('Start');
    } else {
      if (warmupDuration < 5 || warmupDuration > 15) {
        Alert.alert('Warm-up is very important！', 'The duration should ideally be between 5 and 15 minutes.');
        return;
      }
      setTimerStarted(true);
      setButtonText('Cancel');
      setIsCanceled(false);
    }
  };

  const handleFinished = () => {
    setIsCanceled(true);
    navigation.navigate('Round1');
    Vibration.cancel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warmup</Text>
      <Text style={styles.text}>
        Before beginning, warm up your body for about {warmupDuration || 0} minutes
        with activities like jogging or skipping rope.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Warmup Duration:</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setWarmupDuration(parseInt(text))}
          placeholder="Enter warmup duration (5-15 minutes)"
        />
      </View>
      {timerStarted && warmupDuration > 0 && (
        <Countdown duration={warmupDuration * 60} isCanceled={isCanceled} onEnd={() => Vibration.vibrate(PATTERN, true)} />
      )}
      <View style={styles.buttonContainer}>
        <Button title={buttonText} onPress={handleToggleTimer} color="#841584" />
        <Button title="Finished" onPress={handleFinished} color="#841584" />
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

export default WarmupView;
