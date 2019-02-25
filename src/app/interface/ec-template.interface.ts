export interface CarouselInfo {
  title: string;
  description: string;
  img: string;
  button: {
    content: string;
    href: string;
  };
}

export interface ProductInfo {
  id: number;
  name: string;
  description: string;
  img: string;
  onSale: boolean;
  costPrice: string;
  salePrice: string;
}
