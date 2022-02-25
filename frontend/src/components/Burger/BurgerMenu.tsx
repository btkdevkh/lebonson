import '../../assets/css/BurgerMenu.css'

type Props = {
  isOpen: boolean
  handleNavbarBurger: () => void
}

export default function BurgerMenu({ isOpen, handleNavbarBurger }: Props) {

  return (
    <>
      <div 
        className={`burger ${isOpen ? 'open' : 'close'}`}
        onClick={() => {
          handleNavbarBurger()
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}
