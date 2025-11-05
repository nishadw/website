"use client";

import { useEffect, useRef } from "react";

export default function VantaBackgroundClient() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: any;

    if (typeof window !== "undefined") {
      const loadVanta = async () => {
        // Dynamically add p5 script
        if (!(window as any).p5) {
          await new Promise<void>((resolve) => {
            const p5Script = document.createElement("script");
            p5Script.src = "https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.min.js";
            p5Script.onload = () => resolve();
            document.body.appendChild(p5Script);
          });
        }

        // Dynamically add Vanta Topology
        const vantaScript = document.createElement("script");
        vantaScript.src = "https://cdn.jsdelivr.net/npm/vanta/dist/vanta.topology.min.js";
        vantaScript.onload = () => {
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
            backgroundColor: 0x0,
            points: 12.0,
            maxDistance: 10.0,
            spacing: 50.0,
          });
        };
        document.body.appendChild(vantaScript);
      };

      loadVanta();
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }} />;
}
