import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Scenario1 = () => {
  const [deadPointLoad, setDeadPointLoad] = useState('');
  const [livePointLoad, setLivePointLoad] = useState('');
  const [deadLoadFactor, setDeadLoadFactor] = useState('');
  const [liveLoadFactor, setLiveLoadFactor] = useState('');
  const [youngsMod, setYoungsMod] = useState('');
  const [beamInertia, setBeamInertia] = useState('');
  const [beamSpan, setBeamSpan] = useState('');
  const [calculationResult, setCalculationResult] = useState(null);

  const calculationDetails = () => {
    const dpLoad = parseFloat(deadPointLoad);
    const lpLoad = parseFloat(livePointLoad);
    const dlFactor = parseFloat(deadLoadFactor);
    const llFactor = parseFloat(liveLoadFactor);
    const yMod = parseFloat(youngsMod);
    const bInertia = parseFloat(beamInertia);
    const bSpan = parseFloat(beamSpan);

    if (isNaN(dpLoad) || isNaN(lpLoad) || isNaN(dlFactor) || isNaN(llFactor) || isNaN(yMod) || isNaN(bInertia) || isNaN(bSpan)) {
      setCalculationResult('Please enter valid numerical values');
      return;
    }

    const designPointLoad = designLoad(dpLoad, lpLoad, dlFactor, llFactor);
    const [deadSuppReaction, liveSuppReaction] = calculateSuppReactions(dpLoad, lpLoad);
    const designShear = calculateShear(designPointLoad);
    const designMom = calculateBendMom(designPointLoad, bSpan);
    const [deadDeflection, liveDeflection] = calculateDeflection(dpLoad, lpLoad, yMod, bInertia, bSpan);

    setCalculationResult({
      designPointLoad,
      deadSuppReaction,
      liveSuppReaction,
      designShear,
      designMom,
      deadDeflection,
      liveDeflection,
    });
  };

  function designLoad(deadPointLoad, livePointLoad, deadLoadFactor, liveLoadFactor) {
    const designPointLoad = deadPointLoad * deadLoadFactor + livePointLoad * liveLoadFactor;
    return designPointLoad;
  }

  function calculateSuppReactions(deadPointLoad, livePointLoad) {
    const deadSuppReaction = deadPointLoad / 2;
    const liveSuppReaction = livePointLoad / 2;
    return [deadSuppReaction, liveSuppReaction];
  }

  function calculateShear(designPointLoad) {
    const designShear = designPointLoad / 2;
    return designShear;
  }

  function calculateBendMom(designPointLoad, beamSpan) {
    const designMom = (designPointLoad * beamSpan) / 4;
    return designMom;
  }

  function calculateDeflection(deadPointLoad, livePointLoad, youngsMod, beamInertia, beamSpan) {
    const deadDeflection = (deadPointLoad * Math.pow(beamSpan * 1000, 3)) / (48 * youngsMod * beamInertia * 10000);
    const liveDeflection = (livePointLoad * Math.pow(beamSpan * 1000, 3)) / (48 * youngsMod * beamInertia * 10000);
    return [deadDeflection, liveDeflection];
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.column}></View>
        <View style={styles.column}></View>
        <View style={styles.column}></View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Dead Point Load:</Text>
        <TextInput
          style={styles.input}
          value={deadPointLoad}
          onChangeText={setDeadPointLoad}
          placeholder="Enter dead point load"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Live Point Load:</Text>
        <TextInput
          style={styles.input}
          value={livePointLoad}
          onChangeText={setLivePointLoad}
          placeholder="Enter live point load"
          keyboardType="numeric"
        />

        {/* ... repeat the above pattern for the remaining input fields ... */}

        <TouchableOpacity style={styles.button} onPress={calculationDetails}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        {calculationResult && (
          <Text style={styles.resultText}>{typeof calculationResult === 'string' ? calculationResult : JSON.stringify(calculationResult)}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    paddingTop: 100,
  },
  column: {
    flex: 1,
    backgroundColor: 'gray',
    marginHorizontal: 8,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Scenario1;
