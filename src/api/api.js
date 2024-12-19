import axios from 'axios';

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
