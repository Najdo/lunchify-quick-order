
import { MenuItem, Category } from './types';

// Categories
export const categories: Category[] = [
  {
    id: 'sandwiches',
    name: 'Broodjes',
    description: 'Verse broodjes met de lekkerste vullingen',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'salads',
    name: 'Salades',
    description: 'Gezonde en verse salades',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'soups',
    name: 'Soepen',
    description: 'Huisgemaakte soepen',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'drinks',
    name: 'Dranken',
    description: 'Verfrissende dranken',
    image: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    description: 'Zoete lekkernijen',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  }
];

// Menu items
export const menuItems: MenuItem[] = [
  // Sandwiches
  {
    id: 'sandwich-1',
    name: 'Club Sandwich',
    description: 'Gegrilde kip, bacon, sla, tomaat en mayo op wit of bruin brood',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'sandwiches',
    tags: ['populair', 'vlees'],
    options: [
      {
        id: 'bread-type',
        name: 'Broodsoort',
        required: true,
        choices: [
          { id: 'white', name: 'Wit', price: 0 },
          { id: 'brown', name: 'Bruin', price: 0 },
          { id: 'wrap', name: 'Wrap', price: 0.50 }
        ]
      },
      {
        id: 'extras',
        name: 'Extra\'s',
        required: false,
        maxSelections: 3,
        choices: [
          { id: 'extra-cheese', name: 'Extra kaas', price: 0.50 },
          { id: 'extra-bacon', name: 'Extra bacon', price: 1.00 },
          { id: 'avocado', name: 'Avocado', price: 1.00 }
        ]
      }
    ]
  },
  {
    id: 'sandwich-2',
    name: 'Gezond',
    description: 'Jonge kaas, beenham, sla, tomaat, komkommer en ei',
    price: 5.75,
    image: 'https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'sandwiches',
    tags: ['gezond']
  },
  {
    id: 'sandwich-3',
    name: 'Zalm Deluxe',
    description: 'Gerookte zalm, roomkaas, rode ui en rucola',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1485451456034-3f9391c6f769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'sandwiches',
    tags: ['vis', 'premium']
  },
  
  // Salads
  {
    id: 'salad-1',
    name: 'Caesar Salade',
    description: 'Romeinse sla, kip, croutons, Parmezaanse kaas en Caesar dressing',
    price: 8.95,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'salads',
    tags: ['populair', 'vlees']
  },
  {
    id: 'salad-2',
    name: 'Griekse Salade',
    description: 'Tomaat, komkommer, rode ui, olijven, feta kaas en olijfolie',
    price: 7.95,
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'salads',
    tags: ['vegetarisch']
  },
  
  // Soups
  {
    id: 'soup-1',
    name: 'Tomatensoep',
    description: 'Huisgemaakte tomatensoep met basilicum en brood',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1578020190125-d7f0c4d86f34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'soups',
    tags: ['vegetarisch', 'warm']
  },
  {
    id: 'soup-2',
    name: 'Erwtensoep',
    description: 'Traditionele erwtensoep met rookworst en roggebrood',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1605135693932-9d001c67eda0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'soups',
    tags: ['vlees', 'warm', 'seizoen']
  },
  
  // Drinks
  {
    id: 'drink-1',
    name: 'Verse Jus',
    description: 'Vers geperste sinaasappelsap',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'drinks',
    tags: ['gezond', 'fris']
  },
  {
    id: 'drink-2',
    name: 'Koffie',
    description: 'Koffie van versgemalen bonen',
    price: 2.75,
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'drinks',
    tags: ['warm', 'cafeïne']
  },
  
  // Desserts
  {
    id: 'dessert-1',
    name: 'Tiramisu',
    description: 'Huisgemaakte tiramisu met mascarpone',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'desserts',
    tags: ['zoet']
  },
  {
    id: 'dessert-2',
    name: 'Chocolade Brownie',
    description: 'Warme chocolade brownie met vanille-ijs',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'desserts',
    tags: ['zoet', 'chocolade']
  }
];

// Get menu items by category
export const getMenuItemsByCategory = (categoryId: string): MenuItem[] => {
  return menuItems.filter(item => item.category === categoryId);
};

// Get menu item by id
export const getMenuItemById = (id: string): MenuItem | undefined => {
  return menuItems.find(item => item.id === id);
};

// Get category by id
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};
