export default interface postObj {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: { lat: number; lng: number };
  createdAt: Date;
  updatedAt: Date;
  createDate?: Date;
  __v?: any;
  _id?: any;
}
