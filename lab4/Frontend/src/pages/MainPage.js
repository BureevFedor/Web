import MainHeader from './components/MainHeader';
import InputForm from './components/form_components/InputForm';
import Rules from './components/Rules';

const MainPage = () => {
  return (
      <div className="App">
        <MainHeader />
        <InputForm />
        <Rules />
      </div>
    );
}

export default MainPage;