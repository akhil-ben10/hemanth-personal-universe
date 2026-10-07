import React, { useEffect, useRef, useState } from "react";
export default function GamingGear() {
  const ref = useRef(null),
    [paused, setPaused] = useState(
      () => matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
    [visible, setVisible] = useState(false),
    [ready, setReady] = useState(false),
    [error, setError] = useState(false);
  useEffect(() => {
    let live = true;
    const viewerUrl = "/assets/model-viewer.min.js";
    import(/* @vite-ignore */ viewerUrl)
      .then(() => {
        if (live) setReady(true);
      })
      .catch(() => {
        if (live) setError(true);
      });
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0].isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(ref.current);
    return () => {
      live = false;
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    const models = [...ref.current.querySelectorAll("model-viewer")];
    const sync = () =>
      models.forEach(
        (v) => (v.autoRotate = visible && !paused && !document.hidden),
      );
    const fail = () => setError(true);
    models.forEach((v) => v.addEventListener("error", fail));
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      models.forEach((v) => v.removeEventListener("error", fail));
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ready, visible, paused]);
  return (
    <div className="gear-scene">
      <div className="loadout" ref={ref}>
        <span className="loadout-label">THE LOADOUT / 3D</span>
        {[
          ["rifle", "24deg"],
          ["grenade", "-30deg"],
          ["sidearm", "20deg"],
        ].map(([name, speed]) => (
          <model-viewer
            key={name}
            class={name === "rifle" ? "rifle-view" : ""}
            src={"assets/" + name + ".glb"}
            alt={"Rotating 3D game " + name}
            camera-controls=""
            disable-zoom=""
            interaction-prompt="none"
            rotation-per-second={speed}
            exposure="1.5"
            shadow-intensity="1"
          />
        ))}
        {error && (
          <p className="media-error visible">
            This device couldn’t load the 3D display.
          </p>
        )}
        <span className="loadout-help">
          Drag to rotate · Scroll to keep exploring
        </span>
      </div>
      <div className="game-footer">
        <span>A personal tribute to a favourite game.</span>
        <button
          className="motion-toggle"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          {paused ? "Resume rotation" : "Pause rotation"}
        </button>
      </div>
    </div>
  );
}
