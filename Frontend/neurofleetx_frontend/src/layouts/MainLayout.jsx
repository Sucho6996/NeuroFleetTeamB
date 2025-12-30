import TopNavbar from "../components/TopNavbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <TopNavbar />
      <main className="pt-6">{children}</main>
    </div>
  );
};

export default MainLayout;
