import { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import TrainingContext from './TrainingContext';
import { storeData, getData } from '../utils/syncStorage';

const FinishView = () => {
  const {formatTime,exerciseType, duration, restTime, round1Distance, round2Time, round3Distance } = useContext(TrainingContext);
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
  const handleOptionA = () => {
  };
  const handleOptionB = () => {
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
  const renderHeader = () => {
    return (
      <View style={styles.tableHeader}>
        {Object.keys(record).map(key => (
          <Text key={key} style={styles.columnHeader}>{key}</Text>
        ))}
      </View>
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.tableRow}>
        {Object.values(item).map((value, index) => (
          <Text key={index} style={styles.columnValue}>{value}</Text>
        ))}
      </View>
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Congratulations on completing this Protocol!</Text>
        <Text style={styles.text}>
          If you succeed, then next time, you need to follow two options to complete your progressive training:
        </Text>
        <TouchableOpacity style={styles.optionContainer} onPress={handleOptionA}>
          <Text style={styles.optionText}>A: Try and add more distance over the same duration in round 1.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer} onPress={handleOptionB}>
          <Text style={styles.optionText}>B: Add more rounds.</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={addRecord}>
            <Text style={styles.buttonText}>Add Record</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearRecords}>
            <Text style={styles.buttonText}>Clear Records</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Records:</Text>
        {records.length > 0 && (
          <View style={styles.tableContainer}>
            {renderHeader()}
            <FlatList
              data={records}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24
  },
  optionContainer: {
    borderWidth: 1,
    borderColor: '#841584',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#841584',
    textAlign: 'left',
  },
  tableContainer: {
    width: '100%',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#841584',
    paddingVertical: 10,
  },
  columnHeader: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize:10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  columnValue: {
    flex: 1,
    textAlign: 'center',
    fontSize:10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addButton: {
    backgroundColor: '#841584',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  clearButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FinishView;
