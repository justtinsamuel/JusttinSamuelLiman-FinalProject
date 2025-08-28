import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/Index";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
