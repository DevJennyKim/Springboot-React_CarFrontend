import { useState } from 'react';
// import Snackbar from '@mui/material/Snackbar';
interface Car {
  brand: string;
  model: string;
  color: string;
  registerNumber: string;
  year: number;
  price: number;
}

function CarList() {
  const [cars, setCars] = useState<Car[]>([]);
  const [open, setOpen] = useState(false);

  return <div></div>;
}

export default CarList;
