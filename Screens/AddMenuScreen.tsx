import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { AddMenuScreenProps } from '../types';

const AddMenuScreen: React.FC<AddMenuScreenProps> = ({ menuItems, setMenuItems, navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [course, setCourse] = useState<'Starters' | 'Main Course' | 'Desserts'>('Starters');

  const addMenuItem = () => {
    if (!name || !description || !price || isNaN(Number(price))) {
      alert('Please fill out all fields with valid data.');
      return;
    }

    const newItem = {
      name,
      description,
      price: parseFloat(price),
      course,
    };
    setMenuItems([...menuItems, newItem]);
    setName('');
    setDescription('');
    setPrice('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Gradient Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Add Menu Item</Text>
      </View>

      {/* Input Fields */}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Course Selection */}
      <Text style={styles.label}>Select Course</Text>
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Main Course" value="Main Course" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      {/* Add Item Button */}
      <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>

      {/* Menu Items List */}
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name} - ${item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => setMenuItems(menuItems.filter((_, i) => i !== index))}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navButtonText}>Home Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('FilterMenu')}
        >
          <Text style={styles.navButtonText}>Filter Menu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15, // Reduced padding for a more compact layout
    backgroundColor: '#F0F4F8', // Light gray-blue background
  },

  // Header
  headerContainer: {
    backgroundColor: '#00BCD4', // Cyan gradient for header
    paddingVertical: 15, // Reduced vertical padding
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24, // Reduced font size for header text
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // Input Styles
  input: {
    height: 45, // Reduced height for input fields
    borderColor: '#B0BEC5', // Light gray for input borders
    borderWidth: 1,
    marginBottom: 12, // Reduced margin bottom for compactness
    paddingHorizontal: 12, // Adjusted padding for smaller fields
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },

  label: {
    fontSize: 16,
    color: '#37474F', // Dark gray-blue for labels
    marginVertical: 8, // Reduced margin for labels
  },
  picker: {
    height: 45, // Adjusted height for picker
    marginBottom: 20, // Maintained space below picker
    backgroundColor: '#E1F5FE', // Light cyan for picker background
    borderRadius: 8,
  },

  // Buttons
  addButton: {
    backgroundColor: '#00897B', // Teal for primary button
    paddingVertical: 12, // Reduced padding for buttons
    paddingHorizontal: 25, // Adjusted horizontal padding
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 12, // Added margin for spacing
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16, // Adjusted font size for button text
    fontWeight: 'bold',
  },

  // List Items
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12, // Reduced padding for list items
    backgroundColor: '#FFFFFF',
    marginVertical: 6, // Reduced margin between items
    borderRadius: 8,
    borderColor: '#CFD8DC', // Light border color
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 14, // Smaller font size for list items
    color: '#37474F',
  },
  removeButton: {
    backgroundColor: '#FF5252', // Bright red for remove actions
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 12, // Smaller text size for remove button
    fontWeight: 'bold',
  },

  // Navigation Buttons
  navigationButtons: {
    marginTop: 30,
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#00ACC1', // Bright cyan for nav buttons
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginVertical: 8,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16, // Adjusted font size for nav button text
    fontWeight: 'bold',
  },
});

export default AddMenuScreen;
