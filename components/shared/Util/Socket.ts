import io from "Socket.IO-client";

export const socket = io(`${process.env.SOCKETIO}`);

// const Socket: React.FC = () => {

//   useEffect(() => {
//     const socketInitializer = async () => {
//       const socket = io(`${process.env.SOCKETIO}`);
//     };
//     socketInitializer();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return null;
// };

// export default Socket;
