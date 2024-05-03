
import SignUp from "./pages/signUp";
import { Route,Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp></SignUp>} />
        <Route path="/" element={<LoginPage></LoginPage>} />
      </Routes>
    </>
  );
}

export default App;
