import { useLocation, useParams} from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Home,Landing,Detail,Form } from './views';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar/>}

      <Route exact path="/">
        <Landing/>
      </Route>

      <Route path="/home">
        <Home/>
      </Route>

      <Route path="/detail/:id">
        <DetailWrapper />
      </Route>

      <Route path="/create">
        <Form/>
      </Route>
    </div>
  );
}

const DetailWrapper = () => {
  const { id } = useParams();
  return <Detail id={id} />;
};

export default App;
