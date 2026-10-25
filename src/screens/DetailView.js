import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { getPokemonDetail } from '../services/pokeApi';
import { formatPokemonId, capitalize } from '../data/constants';
import { TypeBadge } from '../components/TypeBadge';
import { StatBar } from '../components/StatBar';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';

export const DetailView = ({ pokemonDataOrId, onBack}) =>{
    const [detail, setDetail] = useState(
        typeof pokemonDataOrId === 'object' ? pokemonDataOrId : null
    );

    const [status, setStatus] = useState(
    typeof pokemonDataOrId === 'object' ? 'success' : 'loading'
  );

  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if(typeof pokemonDataOrId !== 'object'){
        const fetchDetail = async () => {
            setStatus('loading')
            try {
                const data = await getPokemonDetail(pokemonDataOrId);
                if(!data){
                    setErrorMessage('No se encontro informacion del pokemon');
                    setStatus('error');
                } else{
                    setDetail(data);
                    setStatus('success');
                }
            } catch (error) {
                setErrorMessage('No fue posible cargar el detalle');
                setStatus('error');
            }
        };
        fetchDetail();
    }
  }, [pokemonDataOrId]);

  if (status === 'loading') {
    return <LoadingView message='Cargando' />
  }

  if(status === 'error'){
    return(
        <View style={styles.errorWrapper}>
            <ErrorView message= {errorMessage}/>
            <Button title='Back' onPress={onBack} color="#2A75BB" />
        </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <Button title="Volver a la lista" onPress={onBack} color="#E3350D" />
      </View>

      {/* Imagen */}
      <Image
        source={{ uri: detail.imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.idText}>{formatPokemonId(detail.id)}</Text>
      <Text style={styles.name}>{capitalize(detail.name)}</Text>

      {/* Tipos */}
      <View style={styles.typesContainer}>
        {detail.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </View>

      {/* Medidas */}
      <View style={styles.measurementsCard}>
        <View style={styles.measurement}>
          <Text style={styles.measurementLabel}>Altura</Text>
          <Text style={styles.measurementValue}>{detail.height} m</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.measurement}>
          <Text style={styles.measurementLabel}>Peso</Text>
          <Text style={styles.measurementValue}>{detail.weight} kg</Text>
        </View>
      </View>

      {/* Estadísticas base */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Estadísticas base</Text>
        {detail.stats.map((stat) => (
          <StatBar key={stat.name} name={stat.name} value={stat.value} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  errorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  topBar: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  image: {
    width: 220,
    height: 220,
  },
  idText: {
    fontSize: 16,
    color: '#8A8A8A',
    fontWeight: 'bold',
    marginTop: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 12,
  },
  typesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  measurementsCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  measurement: {
    alignItems: 'center',
  },
  separator: {
    width: 1,
    height: 35,
    backgroundColor: '#E0E0E0',
  },
  measurementLabel: {
    fontSize: 13,
    color: '#666',
  },
  measurementValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 4,
  },
  statsCard: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
});