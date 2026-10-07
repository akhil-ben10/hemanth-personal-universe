import React, { useRef, useEffect } from "react";
export default function DetailDialog({ photo, project, onClose }) {
  const ref = useRef(null),
    open = !!(photo || project);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    } else if (!open && dialog.open) dialog.close();
  }, [open, photo, project]);
  return (
    <dialog
      ref={ref}
      className={
        photo
          ? "lightbox"
          : "project-dialog" + (project?.background ? " has-project-photo" : "")
      }
      style={
        project?.background
          ? { "--project-photo": `url("${project.background}")` }
          : undefined
      }
      onClose={onClose}
      aria-label={photo ? "Photograph" : project?.title || "Project details"}
      onClick={(e) => {
        if (e.target === ref.current) {
          const r = ref.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="dialog-close"
        aria-label="Close details"
        onClick={onClose}
      >
        Close ×
      </button>
      {photo && (
        <>
          <img src={photo.src} alt={photo.alt} />
          <p>{photo.caption}</p>
        </>
      )}
      {project?.background && (
        <img
          className="project-group-photo"
          src={project.background}
          alt={project.backgroundAlt || project.title + " group photograph"}
          loading="eager"
        />
      )}
      {project && (
        <div className="project-story">
          <span className="detail-label">{project.label}</span>
          <h2>{project.title}</h2>
          <p>{project.intro}</p>
          <div className="detail-grid">
            {project.cards.map(([title, copy]) => (
              <article className="detail-card" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          {project.note && <p className="detail-note">{project.note}</p>}
        </div>
      )}
    </dialog>
  );
}
