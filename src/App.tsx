import Letter from "./components/Letter";
import { SettingProvider } from "./components/SettingContext";
import SideMenu from "./components/SideMenu";

function App() {
  return (
    <SettingProvider>
      <Letter />
      <SideMenu />
    </SettingProvider>
  );
}

export default App;
