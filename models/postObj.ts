export default interface postObj {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: { lat: number; lng: number };
  __v?: any;
  _id?: any;
}
