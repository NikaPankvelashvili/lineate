interface FeaturedProductProps {
  name: string;
  description: string;
  image: StaticImageData;
  reverse?: boolean;
}


interface ParallaxImageProps {
  image: string,
  phrase?: string,
  secondary?: boolean
}

interface ProductImage{
  id: number;
  url: string;
  color: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  photos: ProductImage[];
  colors: string[];
  memories: string[];
  ram: string[];
  type: ProductType;
}

type ProductType = "iphone" | "macbook" | "ipad" | "watch";