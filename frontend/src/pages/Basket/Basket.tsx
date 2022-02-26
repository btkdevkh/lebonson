import { Fragment } from "react";
import { FaHome, FaShoppingBasket, FaUser } from "react-icons/fa";
import BasketItem from "./BasketItem";
import HeadingH2 from "../../components/Heading/HeadingH2";
import SimpleLink from "../../components/Link/SimpleLink";
import useBaskets from "../../hooks/useBaskets";
import { IProduct } from "../../models/lebonson/Product";

export default function Basket() {
  const { baskets } = useBaskets()

  let TVA = 0.5

  const totalAmounts: number = baskets.reduce((acc: number, crr: IProduct) => {
    if(crr.selectedQuantity) return acc += (crr.price * crr.selectedQuantity) + TVA
  }, 0)  

  const totalAticles: number = baskets.reduce((acc: number, crr: IProduct) => {
    if(crr.selectedQuantity) return acc += crr.selectedQuantity
  }, 0)  
  
  return (
    <>
      <section className="product-baskets">
        { baskets.length > 0 ? (
          <>
            <SimpleLink to='/' className={'mb'}><FaHome /> Retour</SimpleLink>

            <HeadingH2>Votre panier</HeadingH2>
            <div className="product-baskets-list mb">
              { baskets && baskets.map((basket: IProduct, idx: number) => (
                <Fragment key={basket.id}>
                  <BasketItem basket={basket} idx={idx} />
                <hr />
                </Fragment>
              )) }

              <br />
              <div style={{ textAlign: 'center' }}>
                <h4>Totals articles : {totalAticles}</h4>
                <h4>Prix totals : {totalAmounts.toFixed(2)}€</h4>
              </div>
            </div>

            <SimpleLink to="/login"><FaUser /> Connectez-vous pour payer</SimpleLink>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <FaShoppingBasket size={100} /> <HeadingH2>Votre panier est vide</HeadingH2>
          </div>
        ) }
      </section>
    </>
  )
}
