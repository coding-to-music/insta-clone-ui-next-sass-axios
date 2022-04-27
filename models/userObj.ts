export default interface UserObj {
  id: string;
  email: string;
  username: string;
  image: string;
  posts: any[];
  description?: string;
  comments: any[];
  __v?: any;
  _id?: any;
}
