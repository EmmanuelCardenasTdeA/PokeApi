import React from "react";

import { View, Text, Button, StyleSheet } from "react-native";

export const ErrorView = ({message, onRetry}) =>{
    return(
    <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{message || 'Ocurrio un error'}</Text>
        {onRetry && (
            <View style={styles.buttonContainer}>
                <Button title="Reintentar" onPress={onRetry} color="#E3350D" />
            </View>
        )}
    </View>
    );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    width: 140,
  },
});