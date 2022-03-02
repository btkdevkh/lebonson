import { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode
  to: string,
  className?: string,
  onClick?: () => void
}

export default function SimpleLink({ children, to, className, onClick }: Props) {
  return (
    <div className={`simple-link ${className}`}>
      <Link to={to} onClick={onClick}>{children}</Link>
    </div>
  )
}
