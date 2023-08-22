import ChatInterface from './components/ChatInterface';
import MarketPlace from './components/MarketPlace';
import Loginpage from './components/LoginPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
         <Route path='/' element={<Loginpage/>}/>
         <Route path='/group_chat/:userId' element={<ChatInterface/>}/>
         <Route path='/group_chat/:userId/marketplace' element={<MarketPlace/>}/>
     </Routes>
    </>
  );
}

export default App;