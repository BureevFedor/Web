import { HashRouter as Router, Routes, Route  } from 'react-router-dom';
import { Provider } from 'react-redux'

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import EntriesStore from './pages/components/form_components/store/EntriesStore';

function App() {
  return (
    <Provider store={EntriesStore}>
      <Router>
        <Routes>
          < Route path="/login" element={<LoginPage/>} />
          < Route path="/main" element={<MainPage/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;