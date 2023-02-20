import React, { useEffect, useState } from "react";
import {
  Feed,
  Navbar,
  Carrousel,
  CarrouselAdmin,
  HeaderAdmin,
} from "../components";
import { usePostUserContext } from "../contexts/PostUserContext";
import { useCurrentUserContext } from "../contexts/userContext";

const backEnd = import.meta.env.VITE_BACKEND_URL;

function Main({ toggleDarkMode, darkMode }) {
  const { setGroupList, setCategoryList, setUserGroups } = usePostUserContext();
  const { user, token } = useCurrentUserContext();
  const [groupId, setGroupId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    fetch(`${backEnd}/api/groups`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((groups) => {
        setGroupList(groups);
      });
    fetch(`${backEnd}/api/categories`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((categories) => {
        setCategoryList(categories);
      });
    fetch(`${backEnd}/api/user_group/user/${user.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
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
      <div>
        {user.is_admin ? (
          <>
            <HeaderAdmin />
            <CarrouselAdmin
              groupId={groupId}
              setGroupId={setGroupId}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
            <div className="md:mx-20 lg:mx-60 xl:mx-72">
              <Feed groupId={groupId} categoryId={categoryId} />
            </div>
          </>
        ) : (
          <div className="md:grid md:grid-cols-3">
            <div className="md:mt-16 rounded-md md:flex md:flex-col md:col-span-1">
              <h1 className="text-primary text-center text-3xl md:text-4xl mb-3 md:w-72 xl:w-96 md:mx-auto">
                Enedis Centre-Val de Loire
              </h1>
              <div className="pt-8 md:ml-5 xl:ml-20 md:h-fit lg:w-80 md:w-60 md:bg-white md:mt-16 md:shadow-md md:rounded-lg md:sticky md:top-20">
                <Carrousel
                  groupId={groupId}
                  setGroupId={setGroupId}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                />
              </div>
            </div>
            <div className="md:col-span-2 md:pr-5 xl:pr-16">
              <Feed groupId={groupId} categoryId={categoryId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
