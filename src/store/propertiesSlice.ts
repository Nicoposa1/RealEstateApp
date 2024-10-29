import { createSlice } from '@reduxjs/toolkit';
import { Property } from '../Interfaces/Property';

const initialState = {
  allProperties: [] as Property[],
  selectedProperty: {} as Property,
  searchTerm: '',
  favorites: [] as Property[],
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.allProperties = action.payload;
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSelectedProperty: (state) => {
      state.selectedProperty = {} as Property;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((property) => property.id !== action.payload.id);
    },
  },
});

export const { setProperties, setSelectedProperty, setSearchTerm, clearSelectedProperty, addFavorite, removeFavorite } = propertiesSlice.actions;

export default propertiesSlice.reducer;
