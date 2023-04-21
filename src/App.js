import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useState , useEffect} from 'react';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import All from './Components/All/All';
import GameDetails from './Components/GameDetails/GameDetails';
import Home from './Components/Home/Home';
import Pc from './Components/PC/Pc';
import Browser from './Components/Browser/Browser';
import ReleaseDate from './Components/ReleaseDate/ReleaseDate';
import Popularity from './Components/Popularity/Popularity';
import Alphabetical from './Components/Alphabetical/Alphabetical';
import Relevance from './Components/Relevance/Relevance';
import Racing from './Components/Racing/Racing';
import Sports from './Components/Sports/Sports';
import Social from './Components/Social/Social';
import Shooter from './Components/Shooter/Shooter';
import OpenWorld from './Components/OpenWorld/OpenWorld';
import Zombie from './Components/Zombie/Zombie';
import Fantasy from './Components/Fantasy/Fantasy';
import ActionRpg from './Components/ActionRpg/ActionRpg';
import Action from './Components/Action/Action';
import Flight from './Components/Flight/Flight';
import BattleRoyale from './Components/BattleRoyale/BattleRoyale';
import NotFount from './Components/NotFount/NotFount';
import MasterLayout from './Components/MasterLayout/MasterLayout';
import jwt from 'jwt-decode'

function App() {

  let [SaveUser, SetSaveUser] = useState(null)
  useEffect(() => {
    if (localStorage.getItem("Token") != null) {
      SaveUserData()
    }
  }, [])
  function SaveUserData() {
    let token = localStorage.getItem("Token")
    let Data = jwt(token)
    SetSaveUser(Data)
  }
  function ProtactRouter(props) {
    if (localStorage.getItem("Token") == null) {
      return <Navigate to={"/SignIn"} />
    }
    else {
      return props.children
    }
  }
  function logOut() {
    localStorage.removeItem("Token")
    SetSaveUser(null)
    return <Navigate to={"/SignIn"} />
  }
  let Routers = createBrowserRouter([
    {
      path: '/', element: <MasterLayout userToken={SaveUser} logOut={logOut}/>, children: [
        { path: '/', element: <ProtactRouter><Home /></ProtactRouter> },
        { path: 'Home', element: <ProtactRouter><Home /></ProtactRouter> },
        { path: 'All', element: <ProtactRouter><All /></ProtactRouter> },
        { path: 'Platforms', element: <ProtactRouter><NotFount /></ProtactRouter> },
        { path: 'Pc', element: <ProtactRouter><Pc /></ProtactRouter> },
        { path: 'Browser', element: <ProtactRouter><Browser /></ProtactRouter> },
        { path: 'SortBy', element: <ProtactRouter><NotFount /></ProtactRouter> },
        { path: 'ReleaseDate', element: <ProtactRouter><ReleaseDate /></ProtactRouter> },
        { path: 'Popularity', element: <ProtactRouter><Popularity /></ProtactRouter> },
        { path: 'Alphabetical', element: <ProtactRouter><Alphabetical /></ProtactRouter> },
        { path: 'Relevance', element: <ProtactRouter><Relevance /></ProtactRouter> },
        { path: 'Categories', element: <ProtactRouter><NotFount /></ProtactRouter> },
        { path: 'Racing', element: <ProtactRouter><Racing /></ProtactRouter> },
        { path: 'Sports', element: <ProtactRouter><Sports /></ProtactRouter> },
        { path: 'Social', element: <ProtactRouter><Social /></ProtactRouter> },
        { path: 'Shooter', element: <ProtactRouter><Shooter /></ProtactRouter> },
        { path: 'OpenWorld', element: <ProtactRouter><OpenWorld /></ProtactRouter> },
        { path: 'Zombie', element: <ProtactRouter><Zombie /></ProtactRouter> },
        { path: 'Fantasy', element: <ProtactRouter><Fantasy /></ProtactRouter> },
        { path: 'ActionRpg', element: <ProtactRouter><ActionRpg /></ProtactRouter> },
        { path: 'Action', element: <ProtactRouter><Action /></ProtactRouter> },
        { path: 'Flight', element: <ProtactRouter><Flight /></ProtactRouter> },
        { path: 'BattleRoyale', element: <ProtactRouter><BattleRoyale /></ProtactRouter> },
        { path: 'GameDetails/:id', element: <ProtactRouter><GameDetails /></ProtactRouter> },
        { path: 'SignIn', element: <SignIn userToken={SaveUserData}/> },
        { path: 'SignUp', element: <SignUp /> },
        { path: '*', element: <NotFount /> }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={Routers} />
    </>
  );
}

export default App;
