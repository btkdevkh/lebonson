import { Fragment } from "react";
import { FaCreditCard, FaHome, FaShoppingBasket, FaUser } from "react-icons/fa";
import BasketItem from "./BasketItem";
import HeadingH2 from "../../components/Heading/HeadingH2";
import SimpleLink from "../../components/Link/SimpleLink";
import useBasket from "../../hooks/useBasket";
import { IProduct } from "../../models/lebonson/Product";
import useUser from "../../hooks/useUser";
import { useLocation } from "react-router-dom";

export default function Basket() {
  const { baskets } = useBasket()
  const { user } = useUser()  
  const location = useLocation()  

  let TVA = 0.5

  const totalAmounts: number = baskets && baskets.reduce((acc: number, crr: IProduct) => {
    if(crr.selectedQuantity) return acc += ((crr.price + TVA) * crr.selectedQuantity)
  }, 0)  

  const totalAticles: number = baskets && baskets.reduce((acc: number, crr: IProduct) => {
    if(crr.selectedQuantity) return acc += crr.selectedQuantity
  }, 0)  
  
  return (
    <>
      <section className="product-baskets">
        { baskets && baskets.length > 0 ? (
          <>
            {location.pathname !== '/payment' ? (
              <>
                <HeadingH2>Votre panier</HeadingH2>
              </>
            ) : null}

            <div className="product-baskets-list">
              {location.pathname === '/payment' && <HeadingH2>Confirmation de l'achat</HeadingH2>}
              
              { baskets && baskets.map((basket: IProduct, idx: number) => (
                <Fragment key={basket.id}>
                  <BasketItem basket={basket} />
                  <hr />
                </Fragment>
              )) }

              <br />
              <div style={{ textAlign: 'center' }}>
                <h4>Totals articles : {totalAticles}</h4>
                <h4>Prix totals : {totalAmounts.toFixed(2)}€</h4>
              </div>
            </div>
            
            {user ? (
              <>
                {location.pathname !== '/payment' ? (
                  <SimpleLink to="/payment" className="mt"><FaCreditCard /> Valider le panier</SimpleLink>
                ) : null}
              </>
            ) : (
              <SimpleLink to="/login" className="mt"><FaUser /> Connectez-vous pour payer</SimpleLink>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <FaShoppingBasket size={100} /> <HeadingH2>Votre panier est vide</HeadingH2>
            <SimpleLink to='/' className={'mb'}><FaHome /> Retour</SimpleLink>
          </div>
        ) }
      </section>
    </>
  )
}
