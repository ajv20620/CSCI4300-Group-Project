'use client';
import React, { useEffect, useRef, useState } from 'react';
import ePub from 'epubjs';

interface EpubRendererProps {
  epubPath: string;
}

const EpubRenderer: React.FC<EpubRendererProps> = ({ epubPath }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<any>(null);
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);

  useEffect(() => {
    const loadEpub = async () => {
      if (!viewerRef.current) return;

      try {
        const book = ePub(epubPath);
        const rendition = book.renderTo(viewerRef.current, {
          width: '100%',
          height: '100%',
        });

        // Display the first page
        await rendition.display();

        // Set up location updates
        rendition.on('relocated', (location: any) => {
          setCurrentLocation(location.start.href);
        });

        renditionRef.current = rendition;
      } catch (err) {
        console.error('Failed to load EPUB:', err);
      }
    };

    loadEpub();

    return () => {
      if (renditionRef.current) {
        renditionRef.current.destroy();
      }
    };
  }, [epubPath]);

  const handleNext = () => {
    if (renditionRef.current) {
      renditionRef.current.next();
    }
  };

  const handlePrev = () => {
    if (renditionRef.current) {
      renditionRef.current.prev();
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', width: '100%', height: '600px' }}>
      <div
        ref={viewerRef}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
      />
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <button onClick={handlePrev} style={{ marginRight: '10px' }}>
          Previous
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
      <p style={{ textAlign: 'center' }}>
        {currentLocation ? `Current Location: ${currentLocation}` : 'Loading...'}
      </p>
    </div>
  );
};

export default EpubRenderer;
