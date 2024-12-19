export interface Link {
  href: string;
}

export interface Links {
  profile: Link;
  search: Link;
  self: Link;
}

export interface Car {
  brand: string;
  model: string;
  color: string;
  registerNumber: string;
  year: number;
  price: number;
  _links: Links;
}

export interface FormData {
  brand: string;
  model: string;
  color: string;
  year: string;
  price: string;
}
export interface AddEditModalProps {
  open: boolean;
  onClose: () => void;
  selectedCar: Car | null;
  onSave: (carData: Car) => void;
}
