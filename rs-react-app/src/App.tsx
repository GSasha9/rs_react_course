import './App.css';
import SearchPage from './pages/search-page/search-page';
import API from './shared/api/api';

function App() {
  return (
    <>
      <SearchPage></SearchPage>
    </>
  );
}

const api = new API();
api.fetchData();

export default App;
