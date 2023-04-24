import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { searchText } from '../features/common/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../auth/FirebaseAuth';
import { selectUser, userAction } from '../features/auth/auth.slice';

function Navigation(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        userAction({
          status: false,
          userDetails: null,
          error: null
        })
        navigate('/');
      })
      .catch((error) => {
        userAction({
          error: error
        })
      });
  };

  const handleSearch=(e)=>{
    const {value}=e.target;
    if(value.length > 3){
      dispatch(searchText(value));
      navigate(`/search?${value}`);
    }
  }

    return (
  <nav className="navbar navbar-expand-lg fixed-top">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">
      <img src="https://i.ibb.co/r5krrdz/logo.png" alt='netflix' className='header-logo'/>
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/browse/movie">Movie</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/browse/tv">Tv</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/browsebygenre/movie/Action/28">Browse By Genre</NavLink>
        </li>
        <div className='d-flex ms-auto'>
        <input className='form-control me-2 rounded-pill bg-transparent text-white' type="text" name='search' placeholder='search' onChange={handleSearch}/>
        </div>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            { user.userDetails ? user.userDetails : 'user' }
          </Link>
          <ul className="dropdown-menu dropdown-menu-end">
            <li><Link className="dropdown-item" to="#">Profile</Link></li>
            <li><Link className="dropdown-item" onClick={handleLogout}>Logout</Link></li>           
          </ul>
        </li>       
      </ul>      
    </div>
  </div>
</nav>
    );
}

export default Navigation;