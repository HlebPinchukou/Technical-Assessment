import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import UserSelection from './components/UserSelection/UserSelection';
import {UserProvider, useUser} from "./components/UserSelection/UserContext";

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="flex flex-row justify-start h-screen">
                    <Routes>
                        <Route path="/" element={<UserSelection />} />
                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <div className="flex flex-row justify-start w-full">
                                    <Sidebar />
                                    <div className="flex flex-col flex-1">
                                        <Header />
                                        <Dashboard />
                                    </div>
                                </div>
                            </PrivateRoute>
                        } />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

const PrivateRoute = ({ children }) => {
    const { user } = useUser();
    return user ? children : <Navigate to="/" />;
};

export default App;
