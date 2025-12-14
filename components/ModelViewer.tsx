import React from 'react';

const ModelViewer: React.FC = () => {
  return (
    <div className="w-full h-full relative group">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="sketchfab-embed-wrapper w-full h-full relative z-10 rounded-xl overflow-hidden shadow-2xl border border-white/5">
        <iframe 
          title="Fashion Design Underwear For Men Boxer Briefs" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          src="https://sketchfab.com/models/c378802e1ac840498f2e119be1f6a9b7/embed?ui_theme=dark&autostart=1&transparent=1"
          className="w-full h-full min-h-[400px] md:min-h-[600px]"
        >
        </iframe>
      </div>
      
      {/* Overlay to prevent accidental scroll capture on mobile until interacted with, 
          though standard iframe behavior usually handles this well on newer devices. 
          We'll keep it clean. */}
    </div>
  );
};

export default ModelViewer;