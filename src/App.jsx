import ModernTemplate from "./templates/Modern/ModernTemplate";
import mockPortfolio from "./data/mockPortfolio";

function App() {
  return (
    <ModernTemplate portfolio={mockPortfolio} />
  );
}

export default App;