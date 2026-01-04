import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { BooksDashboard } from './components/BooksDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

import { AuroraBackground } from './components/ui/aurora-background';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
    return (
        <AuroraBackground>
            <ThemeToggle />
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
        </AuroraBackground>
    );
}

export default App;
