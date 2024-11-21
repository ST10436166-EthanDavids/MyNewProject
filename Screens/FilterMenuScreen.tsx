import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FilterMenuScreenProps } from '../types'; // Correct path to types.ts

const FilterMenuScreen: React.FC<FilterMenuScreenProps> = ({ menuItems, navigation }) => {
  const [selectedCourse, setSelectedCourse] = useState<'Starters' | 'Main Course' | 'Desserts' | 'All'>('All');

  // Filter menu items based on selected course
  const filteredItems = selectedCourse === 'All' ? menuItems : menuItems.filter(item => item.course === selectedCourse);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Filter Menu by Course</Text>

      {/* Course Filter Buttons */}
      <View style={styles.filterButtons}>
        {['All', 'Starters', 'Main Course', 'Desserts'].map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterButton,
              selectedCourse === course && styles.activeFilterButton, // Highlight selected button
            ]}
            onPress={() => setSelectedCourse(course as typeof selectedCourse)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCourse === course && styles.activeFilterButtonText, // Highlight selected text
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
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
          style={styles.navButton}
          onPress={() => navigation.navigate('AddMenu')}
        >
          <Text style={styles.navButtonText}>Add Menu Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navButtonText}>Home Screen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Reduced padding for better screen fit
    backgroundColor: '#f0f8ff', // Light blue background for better aesthetics
  },
  header: {
    fontSize: 20, // Reduced font size for header
    fontWeight: 'bold',
    color: '#2c3e50', // Deep blue for header text
    marginBottom: 15,
    textAlign: 'center',
  },
  filterButtons: {
    marginVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  filterButton: {
    backgroundColor: '#2980b9', // Default primary color for filter buttons
    paddingVertical: 6, // Reduced padding for filter buttons
    paddingHorizontal: 12, // Reduced padding for filter buttons
    borderRadius: 20, // Slightly smaller radius
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  activeFilterButton: {
    backgroundColor: '#27ae60', // Secondary color to highlight the active button
  },
  filterButtonText: {
    color: '#ecf0f1', // Light text for contrast
    fontSize: 14, // Smaller font size for buttons
    fontWeight: 'bold',
  },
  activeFilterButtonText: {
    color: '#fff', // Bright white text for active button
  },
  item: {
    padding: 10, // Reduced padding to make items fit better
    backgroundColor: '#ffffff', // Pure white for clean contrast
    marginVertical: 6, // Reduced margin for item spacing
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db', // Accent color to indicate items visually
  },
  text: {
    fontSize: 16, // Smaller text size for item names
    color: '#34495e', // Slightly darker text for readability
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12, // Smaller font size for descriptions
    color: '#7f8c8d', // Muted color for descriptions
    marginTop: 4,
  },
  navigationButtons: {
    marginTop: 20,
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#8e44ad', // Secondary purple for navigation buttons
    paddingVertical: 10, // Reduced padding
    paddingHorizontal: 25, // Reduced padding
    marginVertical: 6, // Reduced margin between buttons
    borderRadius: 25,
    width: '85%',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 14, // Smaller text size for buttons
    fontWeight: 'bold',
  },
});

export default FilterMenuScreen;
