
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  options?: MenuItemOption[];
}

export interface MenuItemOption {
  id: string;
  name: string;
  choices: MenuItemChoice[];
  required?: boolean;
  maxSelections?: number;
}

export interface MenuItemChoice {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: {
    optionId: string;
    choiceIds: string[];
  }[];
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  orderDate: Date;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface LunchLocation {
  id: string;
  name: string;
  menuUrl?: string;
  createdBy: string;
  createdAt: Date;
  myOrder?: string;
}

export interface Order {
  id: string;
  locationId: string;
  userName: string;
  orderText: string;
  createdAt: Date;
}
