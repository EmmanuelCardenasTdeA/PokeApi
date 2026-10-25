import React from "react";

import { View, Text, Button, StyleSheet } from "react-native";

export const EmptyView = ({message, onClear}) => {
    <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>{message || 'No se encontraron resultados.'}</Text>
        {onClear && (
        <View style={styles.buttonContainer}>
            <Button title="Ver lista completa" onPress={onClear} color="#2A75BB" />
        </View>
        )}
    </View>
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
});