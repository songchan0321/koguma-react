import { useLocation } from "react-router-dom";

const JoinMemberList = () => {
  const [members] = useLocation();

  return (
    <div>
      {members &&
        members.map((member) => <div key={member.id}>{member.nickname}</div>)}
    </div>
  );
};

export default JoinMemberList;
