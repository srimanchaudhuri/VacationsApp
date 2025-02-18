export interface packageModel {
  id: number;
  name: string;
  destination: string;
  description: string;
  price: number;
  days: number;
  isAvailable: boolean;
  bookedTill: Date;
  maxStrength: number;
  userId: number;
}
