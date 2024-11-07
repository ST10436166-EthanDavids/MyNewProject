import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FilterMenuScreenProps } from '../types'; // Correct path to types.ts

const FilterMenuScreen: React.FC<FilterMenuScreenProps> = ({ menuItems, navigation }) => {
  const [selectedCourse, setSelectedCourse] = useState<'Starters' | 'Main Course' | 'Desserts' | 'All'>('All');

  const filteredItems = selectedCourse === 'All' ? menuItems : menuItems.filter(item => item.course === selectedCourse);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Menu by Course</Text>

      {/* Course Filter Buttons */}
      <View style={styles.filterButtons}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedCourse('All')}
        >
          <Text style={styles.filterButtonText}>Show All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedCourse('Starters')}
        >
          <Text style={styles.filterButtonText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedCourse('Main Course')}
        >
          <Text style={styles.filterButtonText}>Main Course</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedCourse('Desserts')}
        >
          <Text style={styles.filterButtonText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      {/* Filtered Menu Items */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.name} - ${item.price.toFixed(2)}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.smallNavButton}
          onPress={() => navigation.navigate('AddMenu')}
        >
          <Text style={styles.smallNavButtonText}>Add Menu Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smallNavButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.smallNavButtonText}>Home Screen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4e6d6a',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterButtons: {
    marginVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  filterButton: {
    backgroundColor: '#4e6d6a',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginVertical: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  navigationButtons: {
    marginTop: 30,
    alignItems: 'center',
  },
  smallNavButton: {
    backgroundColor: '#4e6d6a',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 8,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  smallNavButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FilterMenuScreen;
