import Footer from "./Footer";
import Header from "./Header";

export const AdminPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            {/* {user?.role === "student" && <MainContentSiswa />}
            {user?.role === "teacher" && <MainContentGuru />} */}
            
            <Footer
                logoUrl="https://smakstlouis1sby.sch.id/storage/2020/03/buat-web-1.png"
                logoWidth="48px"
                logoHeight="48px"
            />
        </div>
    );
};