import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";

const Home = () => {

  const {user} =useAuth()



  return (
    <div>
      <Helmet>
        <title>The Warrior Media | Home</title>
      </Helmet>
      Home

<p>{user?.email}</p>
<p>{user?.displayName}</p>
<p>{user?.photoURL}</p>
<p>{user?.email}</p>

    </div>
  );
};

export default Home;
