import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isAuthenticated, isAdmin } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to={'/login'} replace />;
    }

    if (adminOnly && !isAdmin()) {
        return <Navigate to={'/dashboard'} replace />;
    }

    return children;
};

export default ProtectedRoute;