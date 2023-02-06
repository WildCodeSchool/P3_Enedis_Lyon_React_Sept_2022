import React, { useEffect, useState } from "react";
import {
  Feed,
  Header,
  Navbar,
  Carrousel,
  Panel,
  CarrouselAdmin,
  HeaderAdmin,
} from "../components";
import { usePostUserContext } from "../contexts/PostUserContext";
import { useCurrentUserContext } from "../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Main({ toggleDarkMode, darkMode }) {
  const { setGroupList, setCategoryList, setUserGroups } = usePostUserContext();
  const { user } = useCurrentUserContext();
  const [groupId, setGroupId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    fetch(`${backEnd}/api/groups`)
      .then((response) => response.json())
      .then((groups) => {
        setGroupList(groups);
      });
    fetch(`${backEnd}/api/categories`)
      .then((response) => response.json())
      .then((categories) => {
        setCategoryList(categories);
      });
    fetch(`${backEnd}/api/user_group/user/${user.id}`)
      .then((response) => response.json())
      .then((usersGroups) => {
        setUserGroups(usersGroups);
      });
  }, []);

  return (
    <div>
      <Navbar
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        setGroupId={setGroupId}
        setCategoryId={setCategoryId}
      />
      <div className="md:grid md:grid-cols-4">
        {user.is_admin ? (
          <>
            <HeaderAdmin />
            <CarrouselAdmin
              groupId={groupId}
              setGroupId={setGroupId}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
          </>
        ) : (
          <>
            <Header darkMode={darkMode} />
            <Carrousel
              groupId={groupId}
              setGroupId={setGroupId}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
          </>
        )}

        <Feed groupId={groupId} categoryId={categoryId} />
        <Panel />
      </div>
    </div>
  );
}

export default Main;
