import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from "./pages/Homescreen";
import Browse from "./pages/Browse";
import Popup from "./components/Popup";
import BrowseByGenre from "./pages/BrowseByGenre";
import SearchResults from "./pages/SearchResults";
import HomePage from "./pages/HomePage";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userAction } from "./features/auth/auth.slice";
import { auth } from "./auth/FirebaseAuth";
import Profile from "./pages/Profile";

function App() {
  const userStatus = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => { 
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
       dispatch(userAction({
          status: true,
          userDetails: user.displayName,
          error: null
      }));
      } else {
        dispatch(userAction({
            status: false,
            userDetails: null,
            error: null
          }));
      }
    });
    // Clean up subscription on unmount
    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
      {!userStatus.status ? (
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" index element={<Homescreen />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/browse/:platform" element={<Browse />}></Route>
            <Route
              path="/browsebygenre/:platform/:genrename/:genreid"
              element={<BrowseByGenre />}
            ></Route>
            <Route path="/search" element={<SearchResults />}></Route>
          </Route>
        </Routes>
      )}
      <Popup />
    </BrowserRouter>
  );
}

export default App;
//comment