import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Happy Clients" },
  { value: 200, suffix: "+", label: "Projects Completed" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 95, suffix: "%", label: "Client Retention" },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
};

export const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isVisible={isVisible}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
  delay: number;
}

const StatItem = ({ value, suffix, label, isVisible, delay }: StatItemProps) => {
  const [shouldCount, setShouldCount] = useState(false);
  const count = useCountUp(value, 2000, shouldCount);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldCount(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-primary-foreground/80 text-sm md:text-base font-medium">{label}</p>
    </div>
  );
};
