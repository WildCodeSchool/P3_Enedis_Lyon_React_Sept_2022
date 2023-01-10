import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import ProfileCard from "../components/Navbar/Profile/ProfileCard";
// eslint-disable-next-line import/no-named-as-default
import EditPost from "../components/Feed/PostContainer/EditPost";
import { usePostUserContext } from "../contexts/PostUserContext";
import avatar from "../assets/my-avatar.jpeg";
import postImage from "../assets/solar-groups.jpeg";
import menuDots from "../assets/menu-dots.png";

function Profile() {
  const [editPostMenu, setEditPostMenu] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const { users } = usePostUserContext();
  const params = useParams();

  useEffect(() => {
    if (parseInt(params.user_id, 10) > 0) {
      const result = users.filter(
        (user) => user.user_id === parseInt(params.user_id, 10)
      );

      setUserProfile(result[0]);
    } else {
      setUserProfile(users[0]);
    }
  }, [params]);

  const handleEditPost = () => {
    setEditPostMenu(!editPostMenu);
  };

  const handleEditPostModal = () => {
    setEditPostModal(!editPostModal);
  };

  return (
    <div className="bg-[#f6f6fe] w-screen">
      {userProfile && (
        <div>
          <Navbar />
          <ProfileCard userProfile={userProfile} />
          <h1 className="text-primary text-center text-4xl mb-3">
            Publications
          </h1>
          <div>
            <div className="bg-white w-full shadow-md rounded-t-sm border-t border-gray-100 mt-6">
              <div className="flex justify-end pt-2">
                <button onClick={() => handleEditPost()} type="button">
                  <img className="h-8" src={menuDots} alt="Menu" />
                </button>
              </div>
              {editPostMenu ? (
                <div className="origin-top-right absolute right-2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <button
                    onClick={() => handleEditPostModal()}
                    className="text-black p-4 flex"
                    type="button"
                  >
                    <img
                      className="h-5 w-5"
                      src="./src/assets/edit.png"
                      alt="Edit"
                    />
                    <span className="pl-3">Modifier</span>
                  </button>
                  {editPostModal ? (
                    <EditPost
                      editPostModal={editPostModal}
                      setEditPostModal={setEditPostModal}
                      handleEditPostModal={handleEditPostModal}
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-row self-start pb-4 px-6">
                <img
                  className="rounded-full w-20 mr-6 border-4 border-violet"
                  src={avatar}
                  alt="User avatar"
                />
                <div className="flex flex-col">
                  <Link to="/profile">
                    <h2 className="text-primary">Ryan Bidau</h2>
                  </Link>
                  <h3 className="font-light text-primary">
                    Communication Agence - Actualités
                  </h3>
                  <h3 className="text-gray-400 font-light">1h</h3>
                </div>
              </div>
              <img src={postImage} alt="Post" />
              <div className="px-6">
                <h2 className="text-black self-start my-2">
                  Solar énergies renouvelables
                </h2>
                <p className="self-start text-sm">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Minus, natus?...
                  <span className="text-primary text-base"> voir plus</span>
                </p>
                <div className="w-full mt-6 flex items-center justify-between pb-6">
                  <img
                    className="rounded-full w-10 mr-2 border-4 border-violet"
                    src={avatar}
                    alt="My profile avatar"
                  />
                  <input
                    className="w-5/6 shadow-md rounded-xl py-2 pl-2 text-sm placeholder-gray-500 focus:placeholder-gray-400 "
                    type="text"
                    placeholder="Laissez un commentaire..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
