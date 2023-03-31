import Home from './component/Home';
import './style/main.css';
import {ContextProvider} from './ContextProvider'
function App() {
  return (
    <div className="App">
      <ContextProvider>
         <Home/>
      </ContextProvider>
    </div>
  );
}

export default App;
