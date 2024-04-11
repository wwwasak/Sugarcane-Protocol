import { useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Vibration,Alert } from 'react-native';
import Countdown from '../utils/countdown';
import TrainingContext from './TrainingContext';
const Round3View = ({ navigation }) => {
  const {formatTime,round1Distance,
        round2Time,
        round3Distance, PATTERN,setRound3Distance } = useContext(TrainingContext);
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

  const handleRound3Finished = () => {
    setIsCanceled(true);
    Vibration.cancel();
    if(round3Distance>=round1Distance){
      Alert.alert('Congratulations!', " You've surpassed yourself!");
    }else{
      Alert.alert('Unfortunately', " You're a bit tired now, strive to surpass your previous self next time!");
    }
    navigation.navigate('Finish');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Round 3</Text>
      <Text style={styles.text}>
        Run for the same duration as in Round 2 ({formatTime(round2Time)}), aiming to cover more distance than in Round 1 ({round1Distance} meters).
      </Text>
      {timerStarted && <Countdown duration={round2Time} isCanceled={isCanceled} onEnd={() => Vibration.vibrate(PATTERN, true)} />}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Distance Covered:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRound3Distance(parseInt(text))}
          placeholder="Enter distance (in meters)"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={buttonText} onPress={handleToggleTimer} color="#841584" />
        <Button title="Finished" onPress={handleRound3Finished} color="#841584" />
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

export default Round3View;
