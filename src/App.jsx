import React, { useState, useRef, useEffect } from "react";
import { Gallery, FilmToggle } from "./components/Content";
import GamingGear from "./components/GamingGear";
import DetailDialog from "./components/DetailDialog";
import { projects } from "./projects";
import useAmbientMedia from "./useAmbientMedia";
import { initMotion } from "./motion";
export default function App() {
  const root = useRef(null),
    [menuOpen, setMenuOpen] = useState(false),
    [photo, setPhoto] = useState(null),
    [project, setProject] = useState(null);
  const [filmsPaused, setFilmsPaused] = useState(
    () => matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useAmbientMedia(root, filmsPaused, setFilmsPaused);
  useEffect(() => initMotion(root.current), []);
  function onClick(e) {
    const image = e.target.closest("[data-image]"),
      p = e.target.closest("[data-project]");
    if (image)
      setPhoto({
        src: image.dataset.image,
        alt: image.querySelector("img").alt,
        caption: image.dataset.caption,
      });
    if (p) setProject(projects[p.dataset.project]);
    if (e.target.closest(".menu-toggle")) setMenuOpen(!menuOpen);
    if (e.target.closest("#mobile-nav a")) setMenuOpen(false);
  }
  return (
    <div ref={root} onClick={onClick}>
      <header>
        <a aria-label="Hemanth home" className="brand" href="#home">
          hemanth<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">The human</a>
          <a href="#projects">The pursuits</a>
          <a href="#moments">The moments</a>
          <a href="#gaming">Off duty</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          aria-controls="mobile-nav"
          aria-expanded={menuOpen}
          className="menu-toggle"
        >
          Menu <span>{menuOpen ? "−" : "+"}</span>
        </button>
      </header>
      <nav
        aria-label="Mobile navigation"
        className="mobile-nav"
        hidden={!menuOpen}
        id="mobile-nav"
      >
        <a href="#about">The human</a>
        <a href="#projects">The pursuits</a>
        <a href="#moments">The moments</a>
        <a href="#gaming">Off duty</a>
        <a href="#contact">Contact</a>
      </nav>
      <main>
        <div className="hero-scroll">
          <section className="hero" id="home">
            <div className="hero-top">
              <span>A personal world, always unfolding.</span>
              <span>Explorer · Philanthropist · Wisdom seeker</span>
            </div>
            <div className="hero-title">
              <h1>
                STAY
                <br />
                <span>CURIOUS.</span>
              </h1>
              <span aria-hidden="true" className="asterisk">
                ✳
              </span>
            </div>
            <div className="hero-bottom">
              <p>
                Collecting experiences.
                <br />
                Creating connections.
                <br />
                Making a little difference.
              </p>
              <a className="round-link" href="#about">
                Scroll
                <br />
                to explore
              </a>
            </div>
            <div className="photo-stage">
              <button
                aria-label="Open Hemanth's travel photograph"
                className="photo photo-a"
                data-caption="Finding a new perspective."
                data-image="assets/02-1000245161.jpg"
              >
                <img
                  alt="Hemanth photographing a historic courtyard"
                  src="assets/02-1000245161.jpg"
                />
              </button>
              <button
                aria-label="Open Hemanth reading in the mountains"
                className="photo photo-b"
                data-caption="A good book. A quiet mountain. A little perspective."
                data-image="assets/01-1000245163.jpg"
              >
                <img
                  alt="Hemanth reading a book on a misty mountain"
                  src="assets/01-1000245163.jpg"
                />
              </button>
              <button
                aria-label="Open Hemanth's forest portrait"
                className="photo photo-c"
                data-caption="Looking up. Looking beyond."
                data-image="assets/03-1000080360.jpg"
              >
                <img
                  alt="Hemanth looking up among the trees"
                  src="assets/03-1000080360.jpg"
                />
              </button>
              <span className="stage-note">LIFE, THROUGH MY LENS / 01—04</span>
            </div>
            <div aria-hidden="true" className="scroll-cue">
              <i></i>KEEP SCROLLING. THERE’S MORE TO THE STORY.
            </div>
          </section>
        </div>
        <div aria-hidden="true" className="marquee">
          <div>
            EXPLORER ✳ PHILANTHROPIST ✳ WISDOM SEEKER ✳ CREATIVE SOUL ✳ EXPLORER
            ✳ PHILANTHROPIST ✳ WISDOM SEEKER ✳ CREATIVE SOUL ✳{" "}
          </div>
        </div>
        <section className="about section" id="about">
          <div className="section-label">
            <span>01 / THE HUMAN</span>
            <span>A little about me</span>
          </div>
          <div className="about-grid">
            <h2
              aria-label="A curious mind. A generous heart. A life in motion."
              className="split-heading"
            >
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "0" }}>
                  A
                </span>
              </span>{" "}
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "1" }}>
                  curious
                </span>
              </span>{" "}
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "2" }}>
                  mind.
                </span>
              </span>
              <br />
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "3" }}>
                  A
                </span>
              </span>{" "}
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "4" }}>
                  generous
                </span>
              </span>{" "}
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "5" }}>
                  heart.
                </span>
              </span>
              <br />
              <em>
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "6" }}>
                    A
                  </span>
                </span>{" "}
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "7" }}>
                    life
                  </span>
                </span>{" "}
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "8" }}>
                    in
                  </span>
                </span>{" "}
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "9" }}>
                    motion.
                  </span>
                </span>
              </em>
            </h2>
            <div className="about-copy">
              <p>
                Hey, I’m Hemanth. I find joy in the places I explore, the people
                I bring together, and the ideas that ask “what if?”
              </p>
              <p>
                Some days, that means getting lost in a good book. Others, it
                means trying an unexpected recipe with friends, designing
                something from scratch, or showing up for my community.
              </p>
              <p className="telugu" lang="te">
                కొత్త అనుభవాలు. పాత స్నేహాలు.
                <br />
                మనసుకు నచ్చిన ప్రయాణం.
              </p>
            </div>
          </div>
          <div className="values">
            <article>
              <span>01</span>
              <h3>Explorer</h3>
              <p>
                New places. Small details. A different way of seeing the
                everyday.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Philanthropist</h3>
              <p>
                Food, time, and kindness. Giving back starts with showing up.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Wisdom seeker</h3>
              <p>
                Books, conversations, and questions that keep the mind open.
              </p>
            </article>
          </div>
        </section>
        <section className="projects section" id="projects">
          <div className="section-label">
            <span>02 / THE PURSUITS</span>
            <span>Made with people. Made with heart.</span>
          </div>
          <h2
            aria-label="GOOD THINGS GROW TOGETHER."
            className="section-title split-heading"
          >
            <span aria-hidden="true" className="word-mask">
              <span className="motion-word" style={{ "--word-index": "0" }}>
                GOOD
              </span>
            </span>{" "}
            <span aria-hidden="true" className="word-mask">
              <span className="motion-word" style={{ "--word-index": "1" }}>
                THINGS
              </span>
            </span>
            <br />
            <em>
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "2" }}>
                  GROW
                </span>
              </span>{" "}
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "3" }}>
                  TOGETHER.
                </span>
              </span>
            </em>
          </h2>
          <div className="project-list">
            <button className="project project-reunion" data-project="reunion">
              <div className="project-cover reunion-cover">
                <span className="small">LITTLE FLOWERS E.M. HIGH SCHOOL</span>
                <div className="reunion-type">
                  మిత్రులం<span>MITHRULAM</span>
                </div>
                <div className="reunion-bottom">
                  <span>
                    OLD MEMORIES.
                    <br />
                    NEW STORIES.
                  </span>
                  <strong>2K13</strong>
                </div>
              </div>
              <div className="project-caption">
                <div>
                  <span>01 / FRIENDSHIP & COMMUNITY</span>
                  <h3>Mithrulam</h3>
                  <p>Bringing our school days back to life.</p>
                </div>
                <span className="project-open">Explore +</span>
              </div>
            </button>
            <button className="project project-food" data-project="food">
              <div className="project-cover food-cover">
                <img
                  alt="Colorful Indian spices arranged on a dark table"
                  loading="lazy"
                  src="assets/spices.jpg"
                />
                <div className="food-title">
                  <span>WEEKENDS TASTE BETTER TOGETHER.</span>
                  <strong>
                    Dishcovery<span>®</span>
                  </strong>
                  <span>HEMANTH · DIWAKAR · AKHIL</span>
                </div>
              </div>
              <div className="project-caption">
                <div>
                  <span>02 / FOOD & EXPERIMENTATION</span>
                  <h3>Dishcovery</h3>
                  <p>Three friends. Endless flavour possibilities.</p>
                </div>
                <span className="project-open">Explore +</span>
              </div>
            </button>
            <button
              className="project project-kindness"
              data-project="kindness"
            >
              <div className="project-cover kindness-cover">
                <span className="small">
                  A LITTLE KINDNESS GOES A LONG WAY.
                </span>
                <div>
                  GIVE.
                  <br />
                  GATHER.
                  <br />
                  <em>GROW.</em>
                </div>
                <span className="small">ANNADANAM & COMMUNITY SERVICE</span>
              </div>
              <div className="project-caption">
                <div>
                  <span>03 / GIVING BACK</span>
                  <h3>For the community</h3>
                  <p>Small acts, shared purpose.</p>
                </div>
                <span className="project-open">Explore +</span>
              </div>
            </button>
            <button className="project project-design" data-project="design">
              <div className="project-cover design-cover">
                <span className="small">IDEAS THAT BECOME SOMETHING REAL.</span>
                <div className="design-word">
                  MAKE
                  <br />
                  <i>IT</i> FEEL
                  <br />
                  SOMETHING<span>✳</span>
                </div>
              </div>
              <div className="project-caption">
                <div>
                  <span>04 / DESIGN & CREATIVITY</span>
                  <h3>The creative playground</h3>
                  <p>From a spark of an idea to the final detail.</p>
                </div>
                <span className="project-open">Explore +</span>
              </div>
            </button>
          </div>
        </section>
        <div className="wisdom-scroll">
          <section className="wisdom">
            <img
              alt="Hemanth reading with misty mountains behind him"
              loading="lazy"
              src="assets/01-1000245163.jpg"
            />
            <div className="wisdom-copy">
              <span>BETWEEN THE PAGES & THE PLACES</span>
              <h2
                aria-label="There’s always more to discover."
                className="split-heading"
              >
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "0" }}>
                    There’s
                  </span>
                </span>{" "}
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "1" }}>
                    always
                  </span>
                </span>
                <br />
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "2" }}>
                    more
                  </span>
                </span>{" "}
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "3" }}>
                    to
                  </span>
                </span>{" "}
                <em>
                  <span aria-hidden="true" className="word-mask">
                    <span
                      className="motion-word"
                      style={{ "--word-index": "4" }}
                    >
                      discover.
                    </span>
                  </span>
                </em>
              </h2>
              <p>
                A quiet moment, a new perspective, a question worth carrying.
                Curiosity is a good companion.
              </p>
            </div>
          </section>
        </div>
        <div className="gallery-scroll">
          <section className="moments section" id="moments">
            <div className="section-label">
              <span>03 / THE MOMENTS</span>
              <span>Not everything needs a caption.</span>
            </div>
            <div className="moments-heading">
              <h2
                aria-label="LESS POSE. MORE LIFE."
                className="section-title split-heading"
              >
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "0" }}>
                    LESS
                  </span>
                </span>{" "}
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "1" }}>
                    POSE.
                  </span>
                </span>
                <br />
                <em>
                  <span aria-hidden="true" className="word-mask">
                    <span
                      className="motion-word"
                      style={{ "--word-index": "2" }}
                    >
                      MORE
                    </span>
                  </span>{" "}
                  <span aria-hidden="true" className="word-mask">
                    <span
                      className="motion-word"
                      style={{ "--word-index": "3" }}
                    >
                      LIFE.
                    </span>
                  </span>
                </em>
              </h2>
              <span className="gallery-hint">Tap a photo to step closer.</span>
            </div>
            <div className="gallery">
              <Gallery />
            </div>
            <div aria-hidden="true" className="gallery-position">
              <span className="gallery-number">01 / 12</span>
              <div className="track">
                <span></span>
              </div>
            </div>
          </section>
        </div>
        <section className="friendship section" id="friends">
          <div className="section-label">
            <span>THE PEOPLE / THE ROOTS</span>
            <span>Some journeys are better together.</span>
          </div>
          <div className="friendship-layout">
            <div className="friendship-copy">
              <h2>
                GOOD FRIENDS.
                <br />
                <em>DEEP ROOTS.</em>
              </h2>
              <p>
                New places, familiar faces, and stories that get better every
                time we tell them. For Hemanth, friendship lives in the shared
                adventures, the laughter, and the simple joy of being together.
              </p>
              <p lang="te">ప్రయాణాలు మారినా, స్నేహం తోడుంటుంది.</p>
            </div>
            <button
              className="friendship-photo"
              data-image="assets/friends-outdoors.jpg"
              data-caption="Different paths. Shared roots. Friends who make every adventure a memory."
              aria-label="View friends gathered on the tree roots"
            >
              <img
                src="assets/friends-outdoors.jpg"
                alt="Hemanth and friends sitting together on the roots of a large tree"
                loading="lazy"
              />
              <span>DIFFERENT PATHS. SHARED ROOTS. ↗</span>
            </button>
          </div>
        </section>
        <div className="friends-film">
          <video
            aria-label="Silent candid film of Hemanth with friends"
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            poster="assets/friends-film.jpg"
            preload="metadata"
          >
            <source src="assets/friends-film.mp4" type="video/mp4" />
          </video>
          <div className="friends-film-caption">
            <span>THE PEOPLE WHO MAKE IT BETTER</span>
            <h3>
              Good company.
              <br />
              Great memories.
            </h3>
            <FilmToggle
              paused={filmsPaused}
              onToggle={() => setFilmsPaused(!filmsPaused)}
            />
          </div>
        </div>
        <section className="gaming section" id="gaming">
          <div className="section-label">
            <span>04 / THE GAMER</span>
            <span>BGMI · Battlegrounds Mobile India</span>
          </div>
          <div className="gaming-layout">
            <div className="gaming-copy">
              <div className="detail-label">ONE MORE DROP. ONE MORE GAME.</div>
              <h2
                aria-label="DROP IN. SQUAD UP. PLAY ON."
                className="split-heading"
              >
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "0" }}>
                    DROP
                  </span>
                </span>{" "}
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "1" }}>
                    IN.
                  </span>
                </span>
                <br />
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "2" }}>
                    SQUAD
                  </span>
                </span>{" "}
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "3" }}>
                    UP.
                  </span>
                </span>
                <br />
                <em>
                  <span aria-hidden="true" className="word-mask">
                    <span
                      className="motion-word"
                      style={{ "--word-index": "4" }}
                    >
                      PLAY
                    </span>
                  </span>{" "}
                  <span aria-hidden="true" className="word-mask">
                    <span
                      className="motion-word"
                      style={{ "--word-index": "5" }}
                    >
                      ON.
                    </span>
                  </span>
                </em>
              </h2>
              <p>
                Another side of Hemanth: the BGMI player. A little competition,
                quick decisions, and the fun of jumping into a match.
              </p>
              <div className="game-tags">
                <span>BGMI</span>
                <span>Squad energy</span>
                <span>Game mode: on</span>
              </div>
            </div>
            <GamingGear />
          </div>
        </section>
        <section className="morning section" id="morning">
          <div className="section-label">
            <span>05 / THE MORNING RITUAL</span>
            <span>Move. Breathe. Begin again.</span>
          </div>
          <div className="morning-heading">
            <h2
              aria-label="STRONG STARTS. QUIET MIND."
              className="split-heading"
            >
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "0" }}>
                  STRONG
                </span>
              </span>{" "}
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "1" }}>
                  STARTS.
                </span>
              </span>
              <br />
              <em>
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "2" }}>
                    QUIET
                  </span>
                </span>{" "}
                <span aria-hidden="true" className="word-mask">
                  <span className="motion-word" style={{ "--word-index": "3" }}>
                    MIND.
                  </span>
                </span>
              </em>
            </h2>
            <p>
              Before the day gathers pace, Hemanth makes room for himself.
              Morning running, exercise, and yoga bring movement and calm into
              his routine.
            </p>
          </div>
          <div className="morning-routine">
            <article>
              <span>01</span>
              <h3>Running</h3>
              <p>Fresh air, steady steps, and a little time to get moving.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Exercise</h3>
              <p>Making movement a habit, one morning at a time.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Yoga</h3>
              <p>Slow down. Stretch. Breathe. Make room for a calmer start.</p>
            </article>
          </div>
          <div className="film-intro">
            <span>EVERYDAY, IN MOTION</span>
            <FilmToggle
              paused={filmsPaused}
              onToggle={() => setFilmsPaused(!filmsPaused)}
            />
          </div>
          <div className="video-grid">
            <figure>
              <video
                aria-label="Silent film of Hemanth outdoors"
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
                poster="assets/morning-1.jpg"
                preload="metadata"
              >
                <source src="assets/morning-1.mp4" type="video/mp4" />
                Your browser does not support video.
              </video>
              <figcaption>
                <span>01 / A fresh start</span>
                <strong>
                  MAKE ROOM
                  <br />
                  FOR MOVEMENT.
                </strong>
              </figcaption>
            </figure>
            <figure>
              <video
                aria-label="Silent film of Hemanth on the school grounds"
                autoPlay={true}
                loop={true}
                muted={true}
                playsInline={true}
                poster="assets/morning-2.jpg"
                preload="metadata"
              >
                <source src="assets/morning-2.mp4" type="video/mp4" />
                Your browser does not support video.
              </video>
              <figcaption>
                <span>02 / In the moment</span>
                <strong>
                  A LITTLE ENERGY.
                  <br />A LITTLE JOY.
                </strong>
              </figcaption>
            </figure>
          </div>
          <div className="journey-banner">
            <img
              alt="Hemanth looking across a valley from a hilltop viewpoint"
              loading="lazy"
              src="assets/journey.jpg"
            />
            <p>
              A little distance.
              <br />A wider perspective.
            </p>
          </div>
        </section>
        <section className="contact section" id="contact">
          <div className="section-label">
            <span>WEB DESIGN / CONTACT</span>
            <span>Let’s make something memorable.</span>
          </div>
          <h2>
            WANT A WEBSITE
            <br />
            <em>LIKE THIS?</em>
          </h2>
          <p lang="te">ఇలాంటి వెబ్‌సైట్ కావాలా? సంప్రదించండి.</p>
          <a className="contact-number" href="tel:+917661919185">
            7661919185
          </a>
          <div className="contact-actions">
            <a href="tel:+917661919185">Call now ↗</a>
            <a
              href="https://wa.me/917661919185"
              rel="noopener noreferrer"
              target="_blank"
            >
              Chat on WhatsApp ↗
            </a>
          </div>
        </section>
        <section className="closing section">
          <div className="section-label">
            <span>ALWAYS A WORK IN PROGRESS.</span>
            <span>Always open to wonder.</span>
          </div>
          <h2
            aria-label="LIFE’S BETTER WITH A LITTLE CURIOSITY. ✳"
            className="split-heading"
          >
            <span aria-hidden="true" className="word-mask">
              <span className="motion-word" style={{ "--word-index": "0" }}>
                LIFE’S
              </span>
            </span>{" "}
            <span aria-hidden="true" className="word-mask">
              <span className="motion-word" style={{ "--word-index": "1" }}>
                BETTER
              </span>
            </span>
            <br />
            <span aria-hidden="true" className="word-mask">
              <span className="motion-word" style={{ "--word-index": "2" }}>
                WITH
              </span>
            </span>{" "}
            <span aria-hidden="true" className="word-mask">
              <span className="motion-word" style={{ "--word-index": "3" }}>
                A
              </span>
            </span>{" "}
            <span aria-hidden="true" className="word-mask">
              <span className="motion-word" style={{ "--word-index": "4" }}>
                LITTLE
              </span>
            </span>
            <br />
            <em>
              <span aria-hidden="true" className="word-mask">
                <span className="motion-word" style={{ "--word-index": "5" }}>
                  CURIOSITY.
                </span>
              </span>
            </em>
            <span aria-hidden="true" className="closing-mark">
              ✳
            </span>
          </h2>
          <div className="closing-bottom">
            <p>
              Explore more. Create freely.
              <br />
              Stay kind. Keep learning.
            </p>
            <a href="#home">Back to the beginning</a>
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#home">
          hemanth<span>®</span>
        </a>
        <span>A personal world.</span>
        <span>Made with curiosity & heart.</span>
      </footer>
      <div aria-hidden="true" className="scroll-progress"></div>
      <div aria-hidden="true" className="motion-cursor"></div>
      <DetailDialog
        photo={photo}
        project={project}
        onClose={() => {
          setPhoto(null);
          setProject(null);
        }}
      />
    </div>
  );
}
