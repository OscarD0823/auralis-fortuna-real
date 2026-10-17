import { useEffect, useRef, useState } from "react";
import auralisLogo from '../../assets/auralis-brand.png';
import { useNeutralAppearance } from "../appearance";

export function SplashScreen({ onDone }: { onDone: () => void }) {
  const neutral = useNeutralAppearance();
  const [leaving, setLeaving] = useState(false);
  const done = useRef(onDone);
  done.current = onDone;
  const finish = useRef<() => void>(() => {});

  useEffect(() => {
    let finished = false;
    let doneTimer: number;
    const complete = () => {
      if (finished) return;
      finished = true;
      done.current();
    };
    const leave = () => {
      setLeaving(true);
      window.clearTimeout(doneTimer);
      doneTimer = window.setTimeout(complete, 520);
    };
    finish.current = leave;
    const leaveTimer = window.setTimeout(leave, 2700);
    doneTimer = window.setTimeout(complete, 3350);
    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  const skip = () => {
    finish.current();
  };

  return (
    <div className={`splash ${leaving ? "splash--leaving" : ""}`} role="dialog" aria-label={neutral ? "Iniciando Zona de Juegos" : "Iniciando Auralis Fortuna Real"}>
      <div className="splash-stars" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
      </div>
      <div className="splash-orbit splash-orbit--outer" aria-hidden="true" />
      <div className="splash-orbit splash-orbit--inner" aria-hidden="true" />
      <div className="splash-content">
        <div className="splash-emblem" aria-hidden="true">
          <div className="splash-wheel">
            {Array.from({ length: 12 }, (_, index) => (
              <span key={index} style={{ transform: `rotate(${index * 30}deg)` }} />
            ))}
            <div><img src={auralisLogo} width="84" height="84" alt="" decoding="async"/></div>
          </div>
        </div>
        <div className="splash-title" aria-label={neutral ? "Zona de Juegos" : "Auralis Fortuna Real"}>
          <span>{neutral ? "ZONA DE" : "AURALIS"}</span> <strong>{neutral ? "JUEGOS" : "Fortuna Real"}</strong>
        </div>
        <p>{neutral ? "Juega, comparte y celebra" : "Sorteos con emoción real"}</p>
        <div className="splash-loader"><i /></div>
        <a className="splash-watermark" href="https://github.com/OscarD0823/auralis-fortuna-real" target="_blank" rel="noreferrer">
          Una creación de <strong>OscarD0823</strong>
          <span>github.com/OscarD0823/auralis-fortuna-real</span>
        </a>
      </div>
      <button type="button" className="splash-skip" onClick={skip}>Saltar intro</button>
    </div>
  );
}
