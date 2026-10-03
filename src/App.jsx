import { useState } from "react";
import { templates } from "./templates";
import mockPortfolio from "./data/mockPortfolio";
import PortfolioForm from "./components/PortfolioForm";

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const SelectedTemplate = templates[selectedTemplate];

  const [portfolio, setPortfolio] = useState(mockPortfolio);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

          <h1 className="text-xl font-bold text-gray-900">
            Portfolio Builder
          </h1>

          <select
  value={selectedTemplate}
  onChange={(e) => setSelectedTemplate(e.target.value)}
  className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-900"
>
 <option value="modern">Modern</option>

<option value="editorialLuxury">
  Editorial Luxury
</option>

<option value="swissClassic">
  Swiss Classic
</option>

<option value="minimalMonochrome">
  Minimal Monochrome
</option>

<option value="codeCraft">
  CodeCraft
</option>

<option value="neonNexus">
  Neon Nexus
</option>

<option value="crimsonNoir">
  Crimson Noir
</option>

<option value="slateDeck">
  Slate Deck
</option>

<option value="lensStudio">
  Lens Studio
</option>

<option value="bentoLight">
  Bento Light
</option>

<option value="sunsetCoral">
  Sunset Coral
</option>

<option value="oceanBlue">
  Ocean Blue
</option>

<option value="crimsonBold">
  Crimson Bold
</option>

<option value="violetSlides">
  Violet Slides
</option>

<option value="amberLens">
  Amber Lens
</option>

<option value="mintFresh">
  Mint Fresh
</option>
</select>

          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-lg bg-black px-5 py-2.5 font-semibold text-white hover:bg-gray-800"
          >
            {showPreview ? "Edit Portfolio" : "Preview Portfolio"}
          </button>

        </div>
      </header>

      {/* Content */}
      {showPreview ? (
        <SelectedTemplate portfolio={portfolio} />
      ) : (
        <PortfolioForm
          portfolio={portfolio}
          onChange={setPortfolio}
        />
      )}

    </div>
  );
}

export default App;