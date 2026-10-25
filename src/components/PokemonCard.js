import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {formatPokemonId , capitalize} from '../data/constants'

export default function PokemonCard({item, onPress}){
    return(
        <TouchableOpacity>
            <Text style={styles.idText}>{formatPokemonId(item.id)}</Text>
            <Image 
                source={{uri: item.imageUrl}}
                style={styles.iamge}
                resizeMode="contain"
            />
        </TouchableOpacity>
    )
}