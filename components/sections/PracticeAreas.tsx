import { TextLink } from "@/components/ui/primitives";
import type { PracticeArea } from "@/lib/content";

export function PracticeAreaList({ areas }: { areas: PracticeArea[] }) {
  return (
    <div>
      {areas.map((a, i) => (
        <div key={a.id} id={a.id} className="kp-area" data-reveal data-reveal-delay={i * 60} style={{ scrollMarginTop: 100 }}>
          <div>
            <span className="kp-area__num">{a.num}</span>
            <h3 className="kp-area__title">{a.title}</h3>
            <ul className="kp-area__list">
              {a.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="kp-area__side">
            <p className="kp-area__body">{a.body}</p>
            <TextLink href={a.href}>{a.cta}</TextLink>
          </div>
        </div>
      ))}
    </div>
  );
}
