import { useAmityAuthState } from "../providers/AmityAuthProvider";

const UserInfo = () => {
  const { userID, displayName } = useAmityAuthState();
  return (
    <div className="space-top white-text left-text">
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Display Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userID}</td>
            <td>{displayName}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
