// src/app/page.tsx
'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import { ImageData } from "@/types";
import useWindowSize from "@/hooks/useWindowSize";

const testImages: ImageData[] = [
  { id: 1, src: "/images/test-1.png", alt: "Test image 1", type: "png" },
  { id: 2, src: "/images/test-2.jpg", alt: "Test image 2", type: "jpg" },
  { id: 3, src: "/images/test-3.jpg", alt: "Test image 3", type: "jpg" },
];

export default function Home() {
  const { width } = useWindowSize();
  const [columns, setColumns] = useState(3);
  const [isLoading, setIsLoading] = useState<Record<string | number, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  useEffect(() => {
    const zoomLevel = Math.round(window.devicePixelRatio * 100) / 100;
    const baseWidth = width / zoomLevel;
    let newColumns = Math.floor(baseWidth / 300);
    // 最小1列を維持
    newColumns = Math.max(1, newColumns);
    setColumns(newColumns);
  }, [width]);

  const handleImageLoad = (id: string | number) => {
    setIsLoading(prev => ({
      ...prev,
      [id]: false
    }));
  };

  // キーボード操作
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          setSelectedImage(null);
          break;
        case 'ArrowRight':
          const nextIndex = testImages.findIndex(img => img.id === selectedImage.id) + 1;
          if (nextIndex < testImages.length) {
            setSelectedImage(testImages[nextIndex]);
          }
          break;
        case 'ArrowLeft':
          const prevIndex = testImages.findIndex(img => img.id === selectedImage.id) - 1;
          if (prevIndex >= 0) {
            setSelectedImage(testImages[prevIndex]);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-100 dark:bg-gray-900">
      <div 
        className={`grid gap-4 ${columns === 1 ? 'w-full' : ''}`}
        style={{
          gridTemplateColumns: columns === 1 ? '1fr' : `repeat(${columns}, 1fr)`
        }}
      >
        {testImages.map((image) => (
          <div 
            key={image.id} 
            className="group relative aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            {isLoading[image.id] !== false && (
              <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700" />
            )}
            
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={`(max-width: 768px) 100vw, ${Math.floor(100/columns)}vw`}
              className={`
                object-cover
                transition-all duration-300 ease-in-out
                group-hover:scale-105
                ${isLoading[image.id] !== false ? 'opacity-0' : 'opacity-100'}
              `}
              onLoad={() => handleImageLoad(image.id)}
              priority={typeof image.id === 'number' && image.id <= 4}
            />

            <div className="
              absolute inset-0 
              bg-black/50 
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
              flex items-end
              p-4
            ">
              <p className="text-white text-sm font-medium truncate">
                {image.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="object-contain max-h-[90vh]"
            />
            
            {/* Navigation buttons */}
            {testImages.findIndex(img => img.id === selectedImage.id) > 0 && (
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const prevIndex = testImages.findIndex(img => img.id === selectedImage.id) - 1;
                  if (prevIndex >= 0) {
                    setSelectedImage(testImages[prevIndex]);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {testImages.findIndex(img => img.id === selectedImage.id) < testImages.length - 1 && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const nextIndex = testImages.findIndex(img => img.id === selectedImage.id) + 1;
                  if (nextIndex < testImages.length) {
                    setSelectedImage(testImages[nextIndex]);
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image info */}
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-lg font-medium">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}