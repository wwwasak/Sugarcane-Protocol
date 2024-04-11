import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TrainingProvider } from './components/TrainingContext'; 
import InitialView from './components/InitialView';
import WarmupView from './components/WarmupView';
import Round1View from './components/Round1View';
import RestView from './components/RestView';
import Round2View from './components/Round2View';
import Round3View from './components/Round3View';
import FinishView from './components/FinishView'
const Stack = createStackNavigator();

const App = () => {
  return (
    <TrainingProvider> 
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
    </TrainingProvider>
  );
};

export default App;
