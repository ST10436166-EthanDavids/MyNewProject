import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.header}>Add Menu Item</Text>

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
      <TouchableOpacity style={styles.smallButton} onPress={addMenuItem}>
        <Text style={styles.smallButtonText}>Add Item</Text>
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
          style={styles.smallNavButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.smallNavButtonText}>Home Screen</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.smallNavButton}
          onPress={() => navigation.navigate('FilterMenu')}
        >
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
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4e6d6a',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    color: '#4e6d6a',
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  smallButton: {
    backgroundColor: '#4e6d6a',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#555',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  navigationButtons: {
    marginTop: 20,
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

export default AddMenuScreen;
