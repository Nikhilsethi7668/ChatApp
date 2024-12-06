import { useContext, useState } from 'react'
import './App.css'
import Login from './components/Login'
import { AccountContext } from './context/AccountProvider'
import Chatdialog from './chat/Chatdialog';


function App() {
  const { account } = useContext(AccountContext);

  return (
    <>
      {
        account ? <Chatdialog /> : <Login />
      }


    </>
  )
}

export default App
