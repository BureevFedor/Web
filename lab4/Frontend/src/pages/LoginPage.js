import MainHeader from './components/MainHeader';
import Clock from './components/Clock';

import LoginForm from './components/form_components/LoginForm';

const LoginPage = () => {
  return (
      <div className="App">
        <MainHeader />
        <Clock />
        <LoginForm />
      </div>
    );
}

export default LoginPage;