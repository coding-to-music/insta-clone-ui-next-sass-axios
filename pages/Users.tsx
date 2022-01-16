import UsersList from "../components/user/UsersList";
import userObj from "../models/userObj";

const user1: userObj = {
  id: "u1",
  name: "Mike Haslinsky",
  image: "https://i.imgur.com/k7zmyLI.jpeg",
  places: 3,
};
const user2: userObj = {
  id: "u2",
  name: "Valon Rama",
  image: "https://i.imgur.com/zTbh6K1.jpeg",
  places: 1,
};

const Users: React.FC = (props) => {
  const USERS: userObj[] = [user1, user2];

  return <UsersList items={USERS} />;
};

export default Users;
