import axios from 'axios';
import * as type from '../models/Index';
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getCars = async () => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/cars`);
    console.log(data);
    return data;
  } catch (error) {
    console.error('Could not get cars list: ', error);
    throw new Error('Error getting cars list');
  }
};

export const postCar = async (formData: type.FormData) => {
  try {
    await axios.post(`${baseUrl}/api/cars`, formData);
  } catch (error) {
    console.error('Could not add car: ', error);
    throw new Error('Error adding car');
  }
};

export const deleteCar = async (carHref: string) => {
  try {
    await axios.delete(carHref);
  } catch (error) {
    console.error('Could not delete car: ', error);
    throw new Error('Error deleting car');
  }
};

export const updateCar = async (carHref: string, updateCar: type.FormData) => {
  try {
    await axios.put(carHref, updateCar);
  } catch (error) {
    console.error('Could not update car: ', error);
    throw new Error('Error updating car');
  }
};
