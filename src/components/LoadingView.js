import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export const LoadingView = ({message = 'Cargando Pokemon'}) =>{
    return(
    <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.text}>{message}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: '#4B4B4B',
  },
});