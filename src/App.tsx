import "./App.css";
import WeatherDashboard from "./components/WeatherDashboards";

function App() {
  return (
    <div
      className="h-screen w-screen bg-black text-white overflow-hidden"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <WeatherDashboard />
    </div>
  );
}

export default App;
