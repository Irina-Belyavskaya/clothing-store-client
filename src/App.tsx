import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundaryComp from "components/error-boundary.comp";

// ============ Routes =========================
import AppRoutes from "App.routes";

// ============ Redux =========================
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
  return (
    <ErrorBoundaryComp>
      <Provider store={store}>
        <Router>
            <AppRoutes/>
        </Router>
      </Provider>
    </ErrorBoundaryComp>
  );
}

export default App;
