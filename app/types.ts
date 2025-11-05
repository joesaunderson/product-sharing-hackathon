export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  features: string[];
  description: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  orderDate: Date;
  referrerId?: string;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}
