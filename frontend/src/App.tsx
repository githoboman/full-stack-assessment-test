import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { BooksDashboard } from './components/BooksDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <BooksDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
