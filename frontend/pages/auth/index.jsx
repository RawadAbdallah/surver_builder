import { useState } from 'react';
import Login from '../../components/login';
import Register from '../../components/register';
import './auth.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {isLogin ? (
          <Login handleToggle={handleToggle} />
        ) : (
          <Register handleToggle={handleToggle} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
