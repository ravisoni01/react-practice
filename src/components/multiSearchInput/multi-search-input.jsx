import { useEffect, useRef, useState } from "react";
import "./style.css";
import SelectedMenu from "./selected-menu";

const MultiSearchInput = () => {
  const ref = useRef(null);
  const suggestionListRef = useRef(null);

  const [searchText, setSearchText] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = useState(0);

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleSearch = () => {
    setActiveSuggestion(0);

    if (!searchText.trim()) {
      setSuggestionList([]);
      return;
    }

    fetch(`https://dummyjson.com/users/search?q=${searchText}`)
      .then((res) => res.json())
      .then((res) => setSuggestionList(res.users));
  };

  const handleSelectUser = (user) => {
    setSelectedUser((prev) => [...prev, user]);
    setSelectedUserSet((prev) => new Set([...prev, user.email]));
    setSuggestionList([]);
    setSearchText("");
    ref.current.focus();
  };

  const handleRemoveUser = (removeUser) => {
    setSelectedUser((prev) =>
      prev.filter((user) => user.email !== removeUser.email)
    );
    setSearchText("");
    const selectedEmail = selectedUserSet;
    selectedEmail.delete(removeUser.email);
    setSelectedUserSet(selectedEmail);
  };

  const handleKeyDown = (e) => {
    const { key, target } = e;

    if (key === "Backspace" && !target.value && selectedUser.length > 0) {
      const lastUser = selectedUser[selectedUser.length - 1];

      handleRemoveUser(lastUser);
    } else if (e.key === "ArrowDown" && suggestionList?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestionList.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestionList?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestionList.length
    ) {
      handleSelectUser(suggestionList[activeSuggestion]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  useEffect(() => {
    // Handle scrolling of suggestion list based on active suggestion
    if (activeSuggestion > 0 && suggestionListRef.current) {
      const suggestionItem =
        suggestionListRef.current.childNodes[activeSuggestion];
      if (suggestionItem) {
        const suggestionItemOffsetTop = suggestionItem.offsetTop;
        const suggestionItemOffsetBottom =
          suggestionItemOffsetTop + suggestionItem.offsetHeight;
        const containerHeight = suggestionListRef.current.offsetHeight;

        if (suggestionItemOffsetTop < suggestionListRef.current.scrollTop) {
          // Scroll up to make the active suggestion visible at the top
          suggestionListRef.current.scrollTop = suggestionItemOffsetTop;
        } else if (
          suggestionItemOffsetBottom >
          suggestionListRef.current.scrollTop + containerHeight
        ) {
          // Scroll down to make the active suggestion visible at the bottom
          suggestionListRef.current.scrollTop =
            suggestionItemOffsetBottom - containerHeight;
        }
      }
    }
  }, [activeSuggestion]);

  return (
    <div className="search_container">
      <div className="search_input_container">
        {selectedUser.map((user) => (
          <SelectedMenu
            key={user.email}
            name={`${user.firstName} ${user.lastName}`}
            image={user.image}
            onClick={() => handleRemoveUser(user)}
          />
        ))}

        <div>
          <input
            ref={ref}
            placeholder="Search"
            value={searchText}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
          />
          <ul ref={suggestionListRef} className="suggestion_list_container">
            {suggestionList.map((user, index) => {
              return !selectedUserSet.has(user.email) ? (
                <li
                  className={index === activeSuggestion ? "active" : ""}
                  key={user.email}
                  onClick={() => handleSelectUser(user)}
                >
                  <img src={user.image} alt="user image" />
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </li>
              ) : (
                <></>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultiSearchInput;
