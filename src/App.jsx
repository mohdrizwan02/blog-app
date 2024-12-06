import { Outlet } from "react-router-dom";
import { Header,Footer } from "./components";
import { useEffect } from "react";
import  {login} from './store/authSlice'
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('user'))

    
    if(userData){
      dispatch(login(userData))
    }
   
  })
  return (
    <>
    <div className='min-h-screen mx-auto bg-white'>

      <Header/>
      <Outlet />
      <Footer/>
    </div>
    </>
  );
}

export default App;
