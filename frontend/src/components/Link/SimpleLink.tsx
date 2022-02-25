import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode
  to: string,
  className?: string
}

export default function SimpleLink({ children, to, className }: Props) {
  return (
    <div className={`simple-link ${className}`}>
      <Link to={to}>{children}</Link>
    </div>
  )
}
