import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OwnerLogin from "./pages/OwnerLogin";
import CreateStudent from "./pages/CreateStudent";
import OwnerSignup from "./pages/OwnerSignup";
import EditForm from "./pages/OwnerProfile/EditForm";
import OwnerProfile from "./pages/OwnerProfile/OwnerProfile";
import AppBar from "./pages/StudentProfile/Components/AppBar";
import AllBoardings from "./pages/StudentProfile/AllBoardings";
import ContactUs from "./pages/StudentProfile/ContactUs";
import News from "./pages/StudentProfile/News";
import NstayMap from "./pages/StudentProfile/NstayMap";
import Profile from "./pages/StudentProfile/Profile";
import OwnerNav from "./pages/OwnerProfile/Components/OwnerNav";
import SingleBoarding from "./pages/StudentProfile/SingleBoarding";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ownerLogin" element={<OwnerLogin />} />
          <Route path="/studentSignup" element={<CreateStudent />} />
          <Route path="/ownerSignup" element={<OwnerSignup />} />
          <Route path="/ownerProfile/editDetails" element={<EditForm />} />

          <Route path="/ownerProfile" element={<OwnerNav />}>
            <Route index element={<OwnerProfile />} />
            <Route path="nstayMap" element={<NstayMap />} />
            <Route path="contactUS" element={<ContactUs />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/student" element={<AppBar />}>
            <Route index element={<AllBoardings />} />
            <Route path="nstayMap" element={<NstayMap />} />
            <Route path="news" element={<News />} />
            <Route path="contactUS" element={<ContactUs />} />
            <Route path="profile" element={<Profile />} />
            <Route path=":_id" element={<SingleBoarding />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
