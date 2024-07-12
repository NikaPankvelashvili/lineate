export interface ParallaxImageProps {
  image: string,
  phrase?: string,
  secondary?: boolean
}

export type LocaleType = "en" | "ka";

export interface Order {
  id: string;
  metadata: {
    name: string;
    id: string;
    address: string;
    phone: string;
  };
  amount: number;
  latest_charge: {
    id: string;
    amount: number;
    refunded: boolean;
    receipt_url: string;
  };
}
