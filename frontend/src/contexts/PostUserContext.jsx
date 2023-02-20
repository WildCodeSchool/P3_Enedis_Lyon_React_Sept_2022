import React, { createContext, useContext, useState } from "react";

const PostUserContext = createContext();

export default PostUserContext;

export function PostUserContextProvider({ children }) {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [valueSelectedCategory, setValueSelectedCategory] = useState("");
  const [valueSelectedGroup, setValueSelectedGroup] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [refreshComment, setRefreshComment] = useState(false);
  const [userGroups, setUserGroups] = useState([]);

  function handleReset() {
    setValueSelectedGroup("");
    setValueSelectedCategory("");
  }

  return (
    <PostUserContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        groupList,
        setGroupList,
        categoryList,
        setCategoryList,
        showCreatePost,
        setShowCreatePost,
        valueSelectedCategory,
        setValueSelectedCategory,
        setValueSelectedGroup,
        valueSelectedGroup,
        handleReset,
        refreshComment,
        setRefreshComment,
        userGroups,
        setUserGroups,
      }}
    >
      {children}
    </PostUserContext.Provider>
  );
}

export const usePostUserContext = () => useContext(PostUserContext);
