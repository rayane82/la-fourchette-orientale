
import { MenuItem } from './types';

export const COLORS = {
  forestGreen: '#06402B',
  gold: '#D4AF37',
  stone: '#F9F6F2',
  deepTerracotta: '#2D140D',
  darkBottleGreen: '#042D1E',
};

// Série d'images HD du restaurant
export const MENU_IMAGES = [
  "https://i.postimg.cc/bJ7FzN9m/2025-10-09-(8).jpg",
  "https://i.postimg.cc/gjb4CtYh/2025-10-09-(9).jpg",
  "https://i.postimg.cc/c4sBfnCD/2025-10-09-(10).jpg",
  "https://i.postimg.cc/jS8TRPnV/2025-10-09-(12).jpg",
  "https://i.postimg.cc/mkGfmSJ8/2025-10-09-(13).jpg",
  "https://i.postimg.cc/CL7T4kNs/2025-10-09-(14).jpg",
  "https://i.postimg.cc/50Bk2WK0/2025-10-09-(15).jpg",
  "https://i.postimg.cc/k58TTdmW/2025-10-09-(16).jpg",
  "https://i.postimg.cc/MGQjR6SM/2025-10-09-(17).jpg",
  "https://i.postimg.cc/R0L42y18/2025-10-09-(19).jpg",
  "https://i.postimg.cc/SRz5bz0T/2025-10-09-(20).jpg",
  "https://i.postimg.cc/cCmDS7kG/2025-10-09-(21).jpg",
  "https://i.postimg.cc/9Fs9fR6B/2025-10-09-(22).jpg",
  "https://i.postimg.cc/wxGyWRjm/2025-10-09-(23).jpg"
];

export const MENU_ITEMS: MenuItem[] = [
  // PETIT-DÉJEUNER
  { 
    id: '1', 
    category: 'Petit-déjeuner', 
    name: 'Ftour Al-Fourchette', 
    description: 'Msemmen ou Beghrir, Beurre, Miel, Fromage, Oeufs au choix, Jus d\'Orange, Thé ou Café.', 
    price: '55 DH' 
  },
  { 
    id: '2', 
    category: 'Petit-déjeuner', 
    name: 'Ftour Beldi', 
    description: 'Beurre, Miel, Huile d\'olive, Amlou, Fromage, Oeufs, Pain, Thé.', 
    price: '38 DH' 
  },

  // ENTRÉES
  { 
    id: '3', 
    category: 'Entrées', 
    name: 'Zaalouk', 
    description: 'Aubergines grillées et tomates aux épices traditionnelles.', 
    price: '18 DH' 
  },
  { 
    id: '4', 
    category: 'Entrées', 
    name: 'Salade Marocaine', 
    description: 'Tomates fraîches, oignons, poivrons et persil haché.', 
    price: '18 DH' 
  },

  // PLATS
  { 
    id: '5', 
    category: 'Plats', 
    name: 'Tajine de Viande aux Pruneaux', 
    description: 'Viande de veau tendre, pruneaux caramélisés et amandes grillées.', 
    price: '65 DH' 
  },
  { 
    id: '6', 
    category: 'Plats', 
    name: 'Couscous Royal (Vendredi)', 
    description: 'Semoule fine, sept légumes de saison, viande sélectionnée et tfaya.', 
    price: '70 DH' 
  },

  // FAST-FOOD
  { 
    id: '7', 
    category: 'Fast-food', 
    name: 'Sandwich Mixte', 
    description: 'Kefta, Poulet, Frites maison et Salade fraîche.', 
    price: '35 DH' 
  },
  { 
    id: '8', 
    category: 'Fast-food', 
    name: 'Panini Poulet', 
    description: 'Poulet mariné, fromage fondu et frites croustillantes.', 
    price: '25 DH' 
  },

  // DESSERTS & JUS
  { 
    id: '9', 
    category: 'Desserts', 
    name: 'Jus d\'Avocat Royal', 
    description: 'Avocat onctueux, mélange de fruits secs, miel et amandes.', 
    price: '30 DH' 
  },
  { 
    id: '10', 
    category: 'Desserts', 
    name: 'Salade de Fruits', 
    description: 'Assortiment de fruits de saison frais coupés minute.', 
    price: '25 DH' 
  },
];

export const CATEGORIES = ['Petit-déjeuner', 'Entrées', 'Plats', 'Fast-food', 'Desserts'];
