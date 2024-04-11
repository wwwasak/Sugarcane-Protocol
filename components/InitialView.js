import { useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity, Linking} from 'react-native';
import TrainingContext from './TrainingContext'; 

const InitialView = ({ navigation }) => {
  const youtubeLink = "https://www.youtube.com/watch?v=oNkDA2F7CjM&t=11505s";
  const { 
    exerciseType,
    setExerciseType,
    setDuration,
    setRestTime,
  } = useContext(TrainingContext);

  const handleStart = () => {
    navigation.navigate('Warmup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sugarcane Protocol for Endurance</Text>
      <Text style={styles.subTitle}>Discussed by Galpin and Huberman</Text>
  <TouchableOpacity onPress={() => Linking.openURL(youtubeLink)}>
          <Text style={styles.linkText}> (Watch on YouTube)</Text>
        </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Exercise Type:</Text>
        <TextInput
          style={styles.input}
          value={exerciseType}
          onChangeText={setExerciseType}
          placeholder="Enter exercise type"
        />
        <Text style={styles.note}>
          You need to perform this protocol in a way that allows distance
          measurement and ensures safety at high intensity. Exercise types could include running, cycling, rowing, or using an air bike.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Duration (min):</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setDuration(parseInt(text))
          }}
          placeholder="Enter duration (in minutes)"
        />
        <Text style={styles.note}>
          You can choose a different duration if preferred, based on your target,
          such as boxing or others.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rest Time (min):</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setRestTime(parseInt(text)); 
          }}
          placeholder="Enter rest time (in minutes)"
        />
        <Text style={styles.note}>
          You can decide your break time, with a minimum of 2 minutes up to the
          specified duration.
        </Text>
      </View>

      <Button title="Start" onPress={handleStart} color="#841584" />
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
    marginBottom: 5,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
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
  note: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
    linkText: {
    color: '#blue',
    textDecorationLine: 'underline', 
    marginBottom: 10
  },
});

export default InitialView;
