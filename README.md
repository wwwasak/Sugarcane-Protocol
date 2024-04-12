Hi guys,

<a name="home">
I'm glad to have had the opportunity to introduce this Sugarcane Protocol fitness training App. Below is the structure of the contents:</a>

1. [React native and my app introduction](#ch1)

2. [Environment and Testing Instructions](#ch2)

3. [Function introduction](#ch3)  

    3.1 [countdown.js - Create Countdown Timer](#ch3_1) 

    3.2 [countTimer.js - Create a timer to measure the elapsed time](#ch3_2)

    3.3 [syncStorage.js - Used for storing and retrieving data](#ch3_3)

    3.4 [InitialView.js - Input your training schedule](#ch3_4)

    3.5 [WarmupView.js - Set up your warmup duration](#ch3_5)

    3.6 [Round1View.js - A view for round1](#ch3_6)

    3.7 [RestView.js - A view for rest](#ch3_7)

    3.8 [Round2View.js - A view for round2](#ch3_8)

    3.9 [Round3View.js - A view for round3](#ch3_9)

    3.10 [FinishView.js - Save your recent training data and view all saved records](#ch3_10)

4. [Reference](#ref)


---

## <a name="ch1">Ant design and demo case introduction</a>

My app is built on React Native, a cross-platform framework for developing mobile applications using JavaScript and React. It enables developers to write code once and deploy it across both iOS and Android platforms, saving time and effort. It utilizes React for constructing user interfaces on mobile devices while using JavaScript as a bridge to connect different native building languages of various mobile systems. So, for those of us who already have a foundation in React and JavaScript, this is the fastest way to advance in mobile app development.

Because of my personal interest in fitness and having seen a fitness training method called the Sugarcane Protocol discussed by scientific experts Andrew Huberman and Andy Galpin on YouTube, I wanted to create an app that would allow me to easily track relevant records during my workouts at the gym. This plan primarily requires a timer and a notepad to record the time and distance of each exercise round. The functionality isn't complicated and can showcase basic syntax.

It's important to note that while there's still plenty of room for improvement in this app, it already adequately fulfills its recording function. You can also try out this plan at the gym, but please avoid inputting data types beyond the specified requirements; I haven't implemented input restrictions yet LOL. However, I'll continue to refine this app and add additional options for progressive training in the future.
[Home](#home)

![prototyping](https://github.com/wwwasak/Sugarcane-Protocol/blob/main/introduction.png?raw=true)

## <a name="ch2">Environment and Testing Instructions</a>

For this project, my development environment is based on EXPO. EXPO provides a simplified development setup, eliminating the need for complex configurations or additional development tools typically associated with React Native. With EXPO, you can swiftly initialize new projects and effortlessly preview applications on simulators or physical devices.

### For environment

0. First, you need to visit [Expo](https://expo.dev/) and create an account.
1. After creating an account, add a new "snack" (a term used in EXPO for projects).
2. Once you're in the new snack, navigate to the "Project" section on the left side and click on "Import Git Repository."
3. From there, import my repository, and you'll be able to see the app I've created.

```
import React from 'react';
import { Button } from 'antd';

```

### For test

On the right side of the page, you can test the software using your own mobile device or a virtual mobile device provided by a server. I recommend downloading Expo on your own mobile device and scanning the QR code on the right side of the page to connect your device for testing. (Please note that for iOS, you'll need to use the built-in camera on your phone to scan the QR code and access EXPO.)[Home](#home)

## <a name="ch3">Function introduction</a>

Since my app involves numerous components, I will primarily focus on the core aspects of the code. [Home](#home)

The entire app consists of the following screens. Unlike React, it utilizes stack.screen from `@react-navigation/stack` instead of routes. However, the structure is similar, with redirection based on `name`.

```
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Initial">
          <Stack.Screen name="Initial" component={InitialView}  options={{title: 'Sugarcane Protocol'}}/>
          <Stack.Screen name="Warmup" component={WarmupView} />
          <Stack.Screen name="Round1" component={Round1View} />
          <Stack.Screen name="Rest1" component={RestView} />
          <Stack.Screen name="Round2" component={Round2View} />
          <Stack.Screen name="Rest2" component={RestView} />
          <Stack.Screen name="Round3" component={Round3View} />
          <Stack.Screen name="Finish" component={FinishView} />
        </Stack.Navigator>
      </NavigationContainer>
```
In addition to the corresponding seven components, I've also defined three `utils` to streamline the code further.
### <a name="ch3_1">countdown.js - Create Countdown Timer</a>

The countdown component is responsible for rendering the countdown, taking in the required time, providing cancellation functionality, and executing the `onEnd` function when the countdown finishes. I utilize React hooks for this purpose:
Use `useState` to update the countdown.
Use `useEffect` to track variable changes and refresh the entire component.
Use `useRef` to create a persistent reference to maintain the timer's reference throughout the component's lifecycle.


```
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
  ..
```
[Home](#home)
### <a name="ch3_2">countTimer.js - Create a timer to measure the elapsed time </a>
The timer component is responsible for the timer functionality, similar to countdown.js, providing functionalities to clear and pause the timer.



### <a name="ch3_3">syncStorage.js - Used for storing and retrieving data </a>
it operates similarly to `localStorage` in React, storing data in a dictionary-like structure using key-value pairs.
```
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error storing data:', e);
  }
};

```
### <a name="ch3_4">InitialView.js - Input your training schedule </a>
This is the initial interface of the app, primarily allowing users to input the type of exercise they want to perform, as well as the exercise duration and rest time.

In contrast to React components, the main difference lies in what is returned. Instead of HTML elements such as`<div>`,`<p>`,`<span>`,etc.,we need to call `<View>`, `<Text>`, `<Image>`, etc., from React Native. These components are rendered as native UI elements corresponding to the platform.
```
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity, Linking} from 'react-native';
…
return (
…
    <View style={styles.inputContainer}>
        <Text style={styles.label}>Exercise Type:</Text>
        <TextInput
          style={styles.input}
          value={exerciseType}
          onChangeText={setExerciseType}
          placeholder="Enter exercise type"
        />
        <Text style={styles.note}>
          You need to perform this protocol in a way that allows distance measurement and ensures safety at high intensity. Exercise types could include running, cycling, rowing, or using an air bike.
        </Text>
      </View>
```

Furthermore, `CSS` files no longer exist. In React Native, we use `StyleSheet.create` to create corresponding CSS elements in the page, and sizes no longer use units; by default, they correspond to one pixel size on the device.
```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
});

```
[Home](#home)

### <a name="ch3_5">WarmupView.js - Set up your warmup duration </a>
Setting the warm-up duration is recommended to be between 5-15 minutes. I've added buttons to control the countdown, toggling between start and cancel functionalities. When the countdown finishes, the phone will vibrate repeatedly until you click "finish" to stop it and proceed to the next page.

To achieve this, I use `setIsCanceled(true)` to activate `useEffect`, which then deletes the background timer. `Vibration` is an API provided by React Native for convenient implementation of phone vibration. I've placed the vibration settings parameters in `TrainingContext.js`. For specific vibration parameters, you can refer to https://reactnative.dev/docs/vibration.
```
const handleFinished = () => {
    setIsCanceled(true);
    navigation.navigate('Round1');
    Vibration.cancel();
  };

```

### <a name="ch3_6">Round1View.js - A view for round1 </a>
The first round will countdown based on the duration you previously entered. Similarly, it will vibrate to remind you when the countdown ends and prompt you to input the distance covered during your training session.
### <a name="ch3_7">RestView.js - A view for rest </a>
The rest time will be counted down based on the duration you previously entered, and a vibration reminder will be triggered when the countdown ends.
### <a name="ch3_8">Round2View.js - A view for round2 </a>
The second round will display the distance you covered in the first round and initiate the `countTimer` function to time the second round, automatically obtaining the time elapsed after pausing as the duration for the second round. Here, a callback function called `handlePause` is utilized to obtain the number of seconds the timer has been paused through the `onPause` parameter.
```
const handlePause = (seconds) => {
    setPausedSeconds(seconds);
    setRound2Time(seconds);
  };
<View style={styles.timerContainer}>
        <Timer onPause={handlePause}/>
      </View>
```
### <a name="ch3_9">Round3View.js - A view for round3 </a>
The third round will countdown based on the time used in the second round, prompting you to input the distance covered during this time. If the distance exceeds that of the first round, the `Alert` API will be invoked to display a success message; otherwise, it will display a failure message.
```
if(round3Distance>=round1Distance){
      Alert.alert('Congratulations!', " You've surpassed yourself!");
    }else{
      Alert.alert('Unfortunately', " You're a bit tired now, strive to surpass your previous self next time!");
    }
```
[Home](#home)
### <a name="ch3_10">FinishView.js - Save your recent training data and view all saved records </a>
In this page, you can save the training data for this session in the `records` section below. You can also delete all records at once. First, I'll store the previous training data in a `record`, then I'll use `syncStorage.js` to save it in `localStorage`. We'll use `useEffect` to load the local records data when the component is loaded and automatically save new data when `records` change.

Note that the functions for clicking options A and B are currently placeholders and will be filled in later.
```
const record = {
    "exercise": exerciseType,
    "duration": duration+"min",
    "rest": restTime+"min",
    "1Distance": round1Distance+"m",
    "2Time": formatTime(round2Time),
    "3Distance": round3Distance+"m"
  };

  const [records, setRecords] = useState([]);
  useEffect(() => {
    loadRecords();
  }, []);
  const loadRecords = async () => {
    try {
      const storedRecords = await getData('records');
      if (storedRecords !== null) {
        setRecords(JSON.parse(storedRecords));
      }
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };
  useEffect(() => {
    storeData('records', JSON.stringify(records));
  }, [records]);
  const addRecord = () => {
    setRecords(prevRecords => [...prevRecords, record]);
  };
  const clearRecords = () => {
    setRecords([]);
  };
```
[Home](#home)

## <a name="ref">Reference</a>

\[1] Sugarcane Protocol for Endurance – Discussed by Galpin and Huberman - https://www.youtube.com/watch?v=oNkDA2F7CjM&t=11505s

\[2] Expo.docs- https://docs.expo.dev/

\[3] React Native Documentation - https://reactnative.dev/

\[4] Vibration Documentation - https://reactnative.dev/docs/vibration

\[5] AsyncStorage Documentation - https://reactnative.dev/docs/asyncstorage

