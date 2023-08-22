import './LoginPage.css'
import { useNavigate } from 'react-router-dom';

let userId="";
function Loginpage() {
  const navigate = useNavigate();
  const showAlert = () => {
    const inputValue = prompt('Enter User ID:')
      if (inputValue==='admin' || inputValue==='user'){
        userId=inputValue;
        alert(`WELCOME: ${userId}`);
        enterChatInterface()
      }
      else{
        alert("Invalid input. Please enter 'admin' or 'user'.");
      }
  }

  const enterChatInterface=()=>{
    if (userId==='admin' || userId==='user') {
      navigate(`/group_chat/${userId}`)
      // console.log("Loginpage id "+userId)
    }
  }

  
    

  return (
    <div className='App'>
      <div className='login_page'>
        <button className='login_btn' onClick={showAlert}>Login</button>
        <p>Click on the login button and enter 'user' or 'admin'</p>
      </div>      
    </div>
  );
}

export default Loginpage;

