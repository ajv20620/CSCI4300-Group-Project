import React, { useEffect, useRef, useState } from "react";
import ePub from "epubjs";  

interface EpubRendererProps {
  epubPath: string;
}

const EpubRenderer: React.FC<EpubRendererProps> = ({ epubPath }) => {
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const renditionRef = useRef<any>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  useEffect(() => {
    const loadEpub = async () => {
      if (!viewerRef.current) {
        console.error("Viewer ref is not attached to a DOM element.");
        return;
      }

      try {
        const book = ePub(epubPath);
        console.log("Book spine:", book.spine);
        const rendition = book.renderTo(viewerRef.current, {
          width: "100%",
          height: "100%",
        });

        await rendition.display();

        rendition.on("relocated", (location: any) => {
          setCurrentLocation(location.start.href);
        });

        // Save rendition reference for navigation
        renditionRef.current = rendition;
      } catch (err) {
        console.error("Failed to load EPUB:", err);
      }
    };

    loadEpub();

    return () => {
      if (renditionRef.current) {
        renditionRef.current.destroy();
        renditionRef.current = null;
      }
    };
  }, [epubPath]);

  const handleNext = () => {
    if (renditionRef.current) {
      renditionRef.current.next().catch((err: any) => {
        console.error("Failed to navigate to the next page:", err);
      });
    }
  };
  
  const handlePrev = () => {
    if (renditionRef.current) {
      renditionRef.current.prev().catch((err: any) => {
        console.error("Failed to navigate to the previous page:", err);
      });
    }
  };
  

  return (
    <div className="border border-gray-300 bg-gray-700 rounded-lg p-4 max-w-4xl mx-auto">
      <div
        ref={viewerRef}
        className="w-full h-[80vh] bg-gray-100 rounded-lg border border-gray-200 epub-viewer"
        style={{ overflow: "hidden", position: "relative" }}
      />
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
      <p className="mt-4 text-center text-sm text-gray-600">
        {currentLocation
          ? `Current Location: ${currentLocation}`
          : "Loading..."}
      </p>
    </div>
  );
};

export default EpubRenderer;