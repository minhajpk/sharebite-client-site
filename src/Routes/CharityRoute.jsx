import { Navigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import useUserRole from '../Hooks/useUserRole';
import { use } from 'react';

const CharityRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user || role !== 'Charity') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children;
};

export default CharityRoute;