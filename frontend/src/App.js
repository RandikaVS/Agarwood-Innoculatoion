import './App.css';
import { Route } from "react-router-dom";
import Checkout from './components/Checkout';

function App() {
  return (
    <div className="App"  
    style={{
      backgroundImage: `url("https://www.wallpaperflare.com/static/806/342/543/alley-aisle-green-trees-wallpaper.jpg")`,
      minHeight: "150vh",
    }}>

       <Checkout/>

    </div>
  );
}

export default App;
