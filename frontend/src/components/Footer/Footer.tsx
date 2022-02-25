export default function Footer() {
  return (
    <footer style={footerStyle}>
      Tous droits réservés, lebonson &copy; { new Date().getFullYear() }
    </footer>
  )
}

const footerStyle = {
  color: '#fff',
  padding: '15px',
  background: '#111111',
  fontWeight: '700',
  textAlign: 'center' as const,
}
