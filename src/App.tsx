import { AppRoute } from "./routes/AppRoute";
import { UserProvider } from "./providers/UserProvider";

function App() {
  return (
    <UserProvider>
      <AppRoute />
    </UserProvider>
  );
}

export default App;
