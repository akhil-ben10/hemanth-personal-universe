import React from "react";
export const photos = [
  ["everyday-portrait.jpg", "A formal portrait"],
  ["curious-at-work.jpg", "In focus, at work"],
  ["celebration-portrait.jpg", "Dressed for a celebration"],
  ["03-1000080360.jpg", "Among the trees"],
  ["01-1000245163.jpg", "A quiet moment with a book"],
  ["journey.jpg", "A wider perspective"],
  ["04-1000080346.jpg", "Little moments worth keeping"],
  ["02-1000245161.jpg", "Finding a new angle"],
  ["sunlit-portrait.jpg", "Sunlight through the trees"],
  ["creative-portrait.jpg", "A different creative perspective"],
  ["heritage-journey.jpg", "Among stories carved in stone"],
  ["stage-costume.jpg", "Colour, character and creativity"],
];
export function Gallery() {
  return photos.map(([file, title], i) => (
    <button
      key={file}
      data-image={"assets/" + file}
      data-caption={title}
      aria-label={"View " + title}
    >
      <img src={"assets/" + file} alt={title} loading="lazy" />
      <span>
        {String(i + 1).padStart(2, "0")} / {title}
      </span>
    </button>
  ));
}
export function FilmToggle({ paused, onToggle }) {
  return (
    <button className="film-toggle" aria-pressed={paused} onClick={onToggle}>
      {paused ? "Play films" : "Pause films"}
    </button>
  );
}
