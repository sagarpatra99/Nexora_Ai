import { Outlet } from "react-router-dom";
import { Toaster } from "sonner"; // ✅ add this

const App = () => {
  return (
    <div className="min-h-screen">
      {/* ✅ Global Toast System */}
      <Toaster position="top-right" richColors />

      <Outlet />
    </div>
  );
};

export default App;
