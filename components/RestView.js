import  { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Vibration } from 'react-native';
import Countdown from '../utils/countdown';
import TrainingContext from './TrainingContext';

const RestView = ({ route, navigation }) => {
  const { restTime,PATTERN } = useContext(TrainingContext);
  const [isCanceled, setIsCanceled] = useState(false);

  const handleRestFinished = () => {
    setIsCanceled(true);
    if (route.name === 'Rest1') {
      navigation.navigate('Round2');
    } else {
      navigation.navigate('Round3');
    }
    Vibration.cancel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rest</Text>
      <Text style={styles.text}>
        Take a {restTime} minute break before the next round.
      </Text>
      <Countdown duration={restTime * 60} isCanceled={isCanceled} onEnd={() => Vibration.vibrate(PATTERN, true)} />
      <View style={styles.buttonContainer}>
        <Button title="Finished" onPress={handleRestFinished} color="#841584" />
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
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default RestView;
