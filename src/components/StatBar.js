import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { capitalize } from "../data/constants";

const STAT_TRANSLATIONS ={
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
};

export const StatBar =({name, value}) =>{
    const MAX_STAT = 255;
    const percentage = Math.min((value/MAX_STAT) * 100, 100); 

    return(
        <View style={styles.container}>
            <Text style={styles.label}>{STAT_TRANSLATIONS[name] || capitalize(name)}</Text>
            <Text style={styles.value}>{value}</Text>
            <View style={styles.barBackground}>
                <View style={[styles.barFill, {width: `${percentage}%`}]}></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  label: {
    width: 80,
    fontSize: 13,
    color: '#555',
    fontWeight: '500',
  },
  value: {
    width: 35,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'right',
    marginRight: 10,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
});