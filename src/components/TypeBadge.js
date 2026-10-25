import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TYPE_COLORS, capitalize } from "../data/constants";

export const TypeBadge = ({type}) =>{
    const backgroundColor = TYPE_COLORS[type.toLowerCase()] || '#777777';

    return(
        <View style={[styles.badge, {backgroundColor}]}>
            <Text>{capitalize(type)}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});