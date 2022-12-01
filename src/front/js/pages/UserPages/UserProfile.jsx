import React, { useState, useContext, useEffect} from "react";
import "../../../styles/userProfile.css";
import Swal from "sweetalert2";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";

function UserProfile() {
  const { store, actions } = useContext(Context);
  const [userInfo, setUserInfo] = useState([])
  const params = useParams();

  
  console.log(params);

  useEffect(() => {
    async function fetch() {
      let response = await actions.genericFetchProtected(
        `user/${params.theid}`
      );
      let jsonRes = await response.json()
        setUserInfo(jsonRes)
    }
    fetch();
  },[]);

const displayImg = userInfo.img_profile? userInfo.img_profile: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"

  console.log(userInfo)

  return (
    <div className="userProfile">
      <div className="card-userProfile">
        <img className="img-userProfile" src={displayImg} alt="John" />
        <h1>{userInfo.name}</h1>
        <p className="title-userProfile">Email: {userInfo.email}</p>
        <p>Address: {userInfo.address}</p>
        <p>Phone number: {userInfo.phone}</p>

        <p>
        <Link to={`/userProfile/${params.theid}/settings`}><button className="button-userProfile">Edit information</button></Link>
        </p>
      </div>
    </div>
  );
}

export { UserProfile };
