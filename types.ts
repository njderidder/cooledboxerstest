export interface Bundle {
  id: string;
  name: string;
  description: string;
  includes: string[];
  price: number;
  badge?: string;
  cta: string;
  image: string;
}

export enum ColorOption {
  Onyx = 'Onyx Black',
  Navy = 'Arctic Navy',
  Grey = 'Stone Grey',
  Green = 'Forest Green'
}

export const COLORS = [
  { name: ColorOption.Onyx, hex: '#1a1a1a' },
  { name: ColorOption.Navy, hex: '#1e3a8a' },
  { name: ColorOption.Grey, hex: '#4b5563' },
  { name: ColorOption.Green, hex: '#14532d' },
];

export const SIZES = ['S', 'M', 'L', 'XL'];