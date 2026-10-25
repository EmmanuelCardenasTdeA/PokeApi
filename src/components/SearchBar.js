import React from 'reac';

import { View, TextInput, TochableOpacity, Text, StyleSheet} from 'react-native';

export default function SearchBar({value, onChangeText, onSearch, onClear}){
    return(
         <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Busca por nombre o número..."
                placeholderTextColor="#888"
                value={searchTerm}
                onChangeText={setSearchTerm}
                // Desactiva autocorrección y mayúsculas automáticas
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                onSubmitEditing={handleSearch}
            />
            <Button title="Buscar" onPress={handleSearch} color="#E3350D" />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9F9',
  },
});