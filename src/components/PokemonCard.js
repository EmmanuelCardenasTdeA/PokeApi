import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { formatPokemonId, capitalize } from '../data/constants';

export const PokemonCard = ({ pokemon, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <Text style={styles.idText}>{formatPokemonId(pokemon.id)}</Text>
            <Image 
                source={{ uri: pokemon.imageUrl }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
        </TouchableOpacity>
    );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  idText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8A8A8A',
    alignSelf: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#212121',
  },
});