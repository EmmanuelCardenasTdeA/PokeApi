import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailView } from './src/screens/DetailView';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {selectedPokemon ? (
          <DetailView
            pokemonDataOrId={selectedPokemon}
            onBack={() => setSelectedPokemon(null)}
          />
        ) : (
          <HomeScreen onSelectPokemon={(pokemon) => setSelectedPokemon(pokemon)} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E3350D',
  },
});

