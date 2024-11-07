import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { HomeScreenProps } from '../types';

const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems, removeMenuItem, navigation }) => {
  const [averagePrices, setAveragePrices] = useState<{ [key: string]: number }>({});

  // Calculate average prices for each course
  useEffect(() => {
    const courses = ['Starters', 'Main Course', 'Desserts'];
    const averages: { [key: string]: number } = {};

    courses.forEach((course) => {
      const items = menuItems.filter(item => item.course === course);
      const average = items.reduce((acc, item) => acc + item.price, 0) / (items.length || 1);
      averages[course] = average;
    });

    setAveragePrices(averages);
  }, [menuItems]);

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.gradientBackground} />

      {/* Header Section */}
      <Text style={styles.header}>Menu</Text>

      {/* Total Menu Items */}
      <Text style={styles.text}>Total items: {menuItems.length}</Text>

      {/* Display Average Prices */}
      <Text style={styles.text}>Average Prices:</Text>
      {Object.keys(averagePrices).map((course) => (
        <Text key={course} style={styles.text}>
          {course}: ${averagePrices[course].toFixed(2)}
        </Text>
      ))}

      {/* FlatList to Display Menu Items */}
      {menuItems.length > 0 ? (
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name} - ${item.price.toFixed(2)}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <TouchableOpacity 
                style={styles.removeButton} 
                onPress={() => removeMenuItem(index)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No menu items available</Text>
      )}

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.smallNavButton} 
          onPress={() => navigation.navigate('AddMenu')}>
          <Text style={styles.smallNavButtonText}>Add Menu Item</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.smallNavButton} 
          onPress={() => navigation.navigate('FilterMenu')}>
          <Text style={styles.smallNavButtonText}>Filter Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F5F5F5', 
    justifyContent: 'center' 
  },
  
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'linear-gradient(to bottom, #f0f8ff, #dcdcdc)',
    zIndex: -1
  },

  header: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#4e6d6a',
    textAlign: 'center',
    marginVertical: 20 
  },

  text: { 
    fontSize: 18, 
    color: '#333', 
    marginVertical: 5 
  },

  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginVertical: 10, 
    padding: 10, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5 
  },

  itemText: { 
    fontSize: 16, 
    color: '#555' 
  },

  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },

  removeButton: { 
    backgroundColor: '#ff4d4d', 
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    borderRadius: 5, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeButtonText: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },

  noItemsText: { 
    fontSize: 18, 
    color: '#888', 
    textAlign: 'center', 
    marginTop: 20 
  },

  buttonContainer: { 
    marginTop: 30, 
    alignItems: 'center' 
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
    fontWeight: 'bold' 
  },
});

export default HomeScreen;
