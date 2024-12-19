import { useEffect, useState } from 'react';
import { AddEditModalProps, FormData } from '../../models/Index.js';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';

function AddEditModal({
  open,
  onClose,
  selectedCar,
  onSave,
}: AddEditModalProps) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    color: '',
    year: '',
    price: '',
  });

  useEffect(() => {
    if (selectedCar) {
      console.log('selectedCar:', selectedCar);
      console.log('type-year:', typeof selectedCar.year);

      setFormData({
        brand: selectedCar.brand,
        model: selectedCar.model,
        color: selectedCar.color,
        year: selectedCar.year.toString(),
        price: selectedCar.price.toString(),
      });
    }
  }, [selectedCar]);
  if (!open) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const carData: FormData = {
      ...formData,
      year: parseInt(formData.year),
      price: parseInt(formData.price),
    };
    onSave(carData);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Car</DialogTitle>
      <DialogContent>
        <TextField
          label="Brand"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Model"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Color"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEditModal;
