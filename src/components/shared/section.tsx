import * as React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Section({ as: Component = "section", className = "", children, ...props }: SectionProps) {
  return (
    <Component className={`section-spacing relative overflow-hidden ${className}`} {...props}>
      {children}
    </Component>
  );
}
