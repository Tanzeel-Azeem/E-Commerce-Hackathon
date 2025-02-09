export interface IProduct {
  _id: string;
  _type: string;
  productName: string;
  category: string;
  price: number;
  image?: {
    asset: {
      _ref: string;
      _type: "image";
    };
  };
  description: string;
  slug : {
    _type: "slug";
    current: string;  
  }
}
