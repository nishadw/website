"use client";

import { useEffect, useRef } from "react";

interface VantaBackgroundProps {
  onLoaded?: () => void;
}

export default function VantaBackgroundClient({ onLoaded }: VantaBackgroundProps) {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: any;

    const loadVanta = async () => {
      // 1. Load p5 (Required for Topology)
      if (!(window as any).p5) {
        await new Promise<void>((resolve) => {
          const p5Script = document.createElement("script");
          p5Script.src = "https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.min.js";
          p5Script.onload = () => resolve();
          document.body.appendChild(p5Script);
        });
      }

      // 2. Load Vanta Topology
      const vantaScript = document.createElement("script");
      vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.topology.min.js";
      
      vantaScript.onload = () => {
        try {
          // @ts-ignore
          vantaEffect = window.VANTA?.TOPOLOGY({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x3452bb,
            backgroundColor: 0x000000, // This provides the background color!
          });
          
          // Signal that Vanta is running
          if (onLoaded) setTimeout(onLoaded, 100);

        } catch (e) {
          console.error("Vanta failed to init:", e);
          if (onLoaded) onLoaded(); // Fail gracefully
        }
      };
      
      document.body.appendChild(vantaScript);
    };

    loadVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [onLoaded]);

  return (
    <div 
      ref={vantaRef} 
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        zIndex: -1 // Sits behind everything
      }} 
    />
  );
}