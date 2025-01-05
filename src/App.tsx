import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from './contexts/useAuth';
import Header from "./components/Header";
import MainContentSiswa from "./components/MainContentSiswa";
import MainContentGuru from "./components/MainContentGuru";
import LoginPage from "./components/LoginPage";
import Footer from "./components/Footer";
import MainContentDynamic from "./components/MainContentDynamic";
import { AdminPage } from "./components/AdminPage";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
//     children,
// }) => {
//     const { user } = useAuth();

//     if (!user) {
//         return <Navigate to="/login" />;
//     }

//     return <>{children}</>;
// };

const MainContent = () => {
    // const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            {/* {user?.role === "student" && <MainContentSiswa />}
            {user?.role === "teacher" && <MainContentGuru />} */}
            <MainContentDynamic />
            <Footer
                logoUrl="https://smakstlouis1sby.sch.id/storage/2020/03/buat-web-1.png"
                logoWidth="48px"
                logoHeight="48px"
            />
        </div>
    );
};

function App() {
    return (
        <GoogleOAuthProvider clientId="496229497503-e3jpd34e2p7lde03jl20tehsiu0aeosj.apps.googleusercontent.com">
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/admin" element={<AdminPage />} />
                        {/* <Route path="/login" element={<LoginPage />} /> */}
                    </Routes>
                </Router>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
