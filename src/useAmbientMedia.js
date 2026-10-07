import { useEffect } from "react";
export default function useAmbientMedia(root, paused, setPaused) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    root.current
      .querySelectorAll(
        ".about-grid,.values article,.project,.moments-heading,.gallery button,.morning-routine article",
      )
      .forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
      });
    return () => observer.disconnect();
  }, [root]);
  useEffect(() => {
    const films = [...root.current.querySelectorAll("video")],
      visibility = new Map(films.map((v) => [v, false]));
    let live = true;
    films.forEach((v) => {
      v.muted = true;
      v.defaultMuted = true;
      v.loop = true;
      v.controls = false;
    });
    function sync() {
      films.forEach((v) => {
        if (paused || !visibility.get(v) || document.hidden) v.pause();
        else
          v.play().catch(() => {
            if (live) setPaused(true);
          });
      });
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visibility.set(e.target, e.isIntersecting));
        sync();
      },
      { threshold: 0.1 },
    );
    films.forEach((v) => observer.observe(v));
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      live = false;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      films.forEach((v) => v.pause());
    };
  }, [root, paused, setPaused]);
}
