import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getPokemonList, getPokemonDetail } from '../services/pokeApi';
import { PokemonCard } from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';
import { EmptyView } from '../components/EmptyView';

export const HomeScreen = ({ onSelectPokemon }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Estados de interfaz
  const [status, setStatus] = useState('loading');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadInitialData = async () => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const data = await getPokemonList(20, 0);
      setPokemonList(data.results);
      setOffset(20);
      setHasMore(Boolean(data.hasMore));
      setStatus('success');
    } catch (err) {
      setErrorMessage('No se pudieron cargar los Pokémon.');
      setStatus('error');
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

   //Carga 20 Pokémon adicionales
   
  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore || status !== 'success') return;

    setIsLoadingMore(true);
    try {

      const data = await getPokemonList(20, offset);
      setPokemonList((prev) => [...prev, ...data.results]);
      setOffset((prev) => prev + 20);
      setHasMore(Boolean(data.hasMore));
    } catch (err) {

    } finally {
      setIsLoadingMore(false);
    }
  };


   // Manejador de búsqueda por nombre o ID
 
  const handleSearch = async (query) => {
    const q = query.trim();
    if (!q) {
      loadInitialData();
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const result = await getPokemonDetail(q);
      if (!result) {
        setStatus('empty');
      } else {
        // Redirige directamente al detalle si es un Pokémon válido
        onSelectPokemon(result);
        setStatus('success');
      }
    } catch (err) {
      setErrorMessage('Error al realizar la búsqueda.');
      setStatus('error');
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>PokéDex Explorer</Text>
      </View>

      {/* Barra de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Manejo de estados de la interfaz */}
      {status === 'loading' && <LoadingView message="Cargando Pokémon" />}

      {status === 'error' && (
        <ErrorView message={errorMessage} onRetry={loadInitialData} />
      )}

      {status === 'empty' && (
        <EmptyView
          message="No se encontró ningún Pokémon"
          onClear={loadInitialData}
        />
      )}

      {status === 'success' && (
        /*Renderizado de FlatList  */
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          renderItem={({ item }) => (
            <PokemonCard
              pokemon={item}
              onPress={() => onSelectPokemon(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isLoadingMore ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#E3350D" />
                <Text style={styles.footerText}>Cargando más</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  header: {
    backgroundColor: '#E3350D',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listContent: {
    padding: 8,
  },
  footerLoader: {
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
});