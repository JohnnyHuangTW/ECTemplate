export interface CarouselInfo {
  title: string;
  description: string;
  img: string;
  button: {
    display: boolean;
    content?: string;
    href?: string;
  };
}

export interface ProductInfo {
  id: number;
  name: string;
  description: string;
  category: string;
  img: string;
  onSale: boolean;
  costPrice: string;
  salePrice?: string;
}

export interface CategoryInfo {
  name: string;
  redirect: string;
  count?: number;
  products?: ProductInfo[];
}
