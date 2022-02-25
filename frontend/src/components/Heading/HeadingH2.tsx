import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function HeadingH2({ children }: Props) {
  return (
    <h2 style={{ marginBottom: '15px' }}>{children}</h2>
  )
}
