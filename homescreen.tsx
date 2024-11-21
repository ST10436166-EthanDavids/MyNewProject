import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Gradient Background */}
        <View style={styles.gradientBackground} />

        {/* Header Section */}
        <Text style={styles.header}>Christoffel's Menu</Text>

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
                <View style={styles.itemDetails}>
                  <Text style={styles.itemText}>{item.name} - ${item.price.toFixed(2)}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeMenuItem(index)}
                >
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
            onPress={() => navigation.navigate('AddMenu')}
          >
            <Text style={styles.smallNavButtonText}>Add Menu Item</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallNavButton}
            onPress={() => navigation.navigate('FilterMenu')}
          >
            <Text style={styles.smallNavButtonText}>Filter Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Light gray background for contrast
    justifyContent: 'center',
  },

  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f0f8ff', // Subtle gradient
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#37474F', // Dark blue-gray for primary text
    textAlign: 'center',
    marginBottom: 20,
  },

  text: {
    fontSize: 18,
    color: '#455A64', // Muted grayish-blue for secondary text
    marginVertical: 5,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#FFFFFF', // White card background
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CFD8DC', // Light border for card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  itemDetails: {
    flex: 1,
    marginRight: 10,
  },

  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#37474F',
  },

  description: {
    fontSize: 14,
    color: '#607D8B', // Muted blue for descriptions
    marginTop: 5,
  },

  removeButton: {
    backgroundColor: '#FF5252', // Bright red for the remove button
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  noItemsText: {
    fontSize: 18,
    color: '#78909C', // Muted blue-gray for no items
    textAlign: 'center',
    marginTop: 20,
  },

  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  smallNavButton: {
    backgroundColor: '#00897B', // Teal for navigation buttons
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginVertical: 8,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },

  smallNavButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
