
export type ReservationStatus = 'En attente' | 'Confirmé' | 'Annulé';
export type ClientType = 'Nouveau' | 'Habitué' | 'VIP';

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  status: ReservationStatus;
  clientType: ClientType;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}
