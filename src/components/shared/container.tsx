import * as React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Container({ as: Component = "div", className = "", children, ...props }: ContainerProps) {
  return (
    <Component className={`container-custom w-full ${className}`} {...props}>
      {children}
    </Component>
  );
}
