import { StackNavigationProp } from '@react-navigation/stack';

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  course: 'Starters' | 'Main Course' | 'Desserts';
};

export type RootStackParamList = {
  Home: undefined;
  AddMenu: undefined;
  FilterMenu: undefined;
};

export interface HomeScreenProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;  // Added setMenuItems to HomeScreenProps
  removeMenuItem: (index: number) => void;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export interface AddMenuScreenProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;  // Added setMenuItems to AddMenuScreenProps
  navigation: StackNavigationProp<RootStackParamList, 'AddMenu'>;
}

export interface FilterMenuScreenProps {
  menuItems: MenuItem[];
  navigation: StackNavigationProp<RootStackParamList, 'FilterMenu'>;
}
