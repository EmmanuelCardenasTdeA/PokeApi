import React from 'reac';

import { View, TextInput, TochableOpacity, Text, StyleSheet} from 'react-native';

export default function SearchBar({value, onChangeText, onSearch, onClear}){
    return(
        <View style={styles.container}>
            <TextInput
            style={styles.input}
            placeholder='Buscar por nombre o numero'
            placeholderTextColor='#888'
            value={value}
            onChangeText={onChangeText}
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='search'
            onSubmitEditing={onSearch}
            />
            <TochableOpacity>
                <Text>Buscar</Text>
            </TochableOpacity>
            {value.leght > 0 && (
                <TochableOpacity onPress={onClear}>
                    <Text>Limpiar</Text>
                </TochableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        paddingHorizontal:16,
        paddingVertical:10,
        alignItems:'center',
        gap: 8,
    },
    input:{
        flex:1,
        height:44,
        backgroundColor: '#FFFFFF',
        borderRadius:8,
        paddingHorizontal:14,
        fontSize:14,
        color: '#1A1A1A',
    },
    buttonText:{
        color:'#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    clearButton:{
        padding: 6,
    },
    clearButtonText:{
        color:'#888',
        fontSize:16,
    }
})