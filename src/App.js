
import SignUp from "./pages/signUp";
import { Route,Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import ChatWindow from "./pages/chatWindow";
function App() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp></SignUp>} />
        <Route path="/" element={<LoginPage></LoginPage>} />
        <Route path="/chat" element={<ChatWindow></ChatWindow>} />
      </Routes>
    </>
  );
}

export default App;
