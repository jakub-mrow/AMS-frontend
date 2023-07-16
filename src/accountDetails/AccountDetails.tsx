import { useParams } from "react-router-dom";

export const AccountDetails = () => {
  const { id } = useParams();
  return <div>AccountDetails: {id}</div>;
};
