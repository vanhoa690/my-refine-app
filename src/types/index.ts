export interface Product {
  id: number;
  name: string;
  isActive: boolean;
  description: string;
  images: (IFile & { thumbnailUrl?: string })[];
  createdAt: string;
  price: number;
  category: {
    id: number;
    title: string;
  };
  stock: number;
}

export interface Category {
  id: number;
  title: string;
  isActive: boolean;
}

export interface IFile {
  name: string;
  percent: number;
  size: number;
  status: "error" | "success" | "done" | "uploading" | "removed";
  type: string;
  uid: string;
  url: string;
}

export interface ISalesChart {
  date: string;
  title?: "Order Count" | "Order Amount";
  value: number;
}
