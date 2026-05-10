import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/UserContext';
import SecureRoute from './components/SecureRoute';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Overview from './pages/Overview';
import InitiativeDetail from './pages/InitiativeDetail';
import CreateInitiative from './pages/CreateInitiative';
import Assignments from './pages/Assignments';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/overview"
              element={
                <SecureRoute>
                  <Overview />
                </SecureRoute>
              }
            />
            <Route
              path="/initiative/:id"
              element={
                <SecureRoute>
                  <InitiativeDetail />
                </SecureRoute>
              }
            />
            <Route
              path="/initiatives/new"
              element={
                <SecureRoute>
                  <CreateInitiative />
                </SecureRoute>
              }
            />
            <Route
              path="/assignments"
              element={
                <SecureRoute>
                  <Assignments />
                </SecureRoute>
              }
            />
            <Route path="/" element={<Navigate to="/overview" />} />
          </Routes>
        </Router>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
