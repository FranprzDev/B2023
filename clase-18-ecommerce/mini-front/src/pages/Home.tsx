import { Wallet, initMercadoPago } from "@mercadopago/sdk-react"
import { useMemo, useState } from 'react'
import '../App.css'
import comingSoon from "../assets/coming-soon.png"
import messiCampeon from "../assets/messi-campeon.webp"
import messiMicro from "../assets/messi-micro.webp"
import Card from '../components/Card'

type CartItem = {
  id: number
  price: number
}

initMercadoPago('TEST-d76f378d-9d5f-41af-b482-9ecffabd7605');

function Home() {
  const [carrito, setCarrito] = useState<CartItem[]>([])
  const [preferenceId, setPreferenceId] = useState<string | null>(null)

  const total = useMemo<number>(() => carrito.reduce<number>((acc, cur) => acc + cur.price, 0),[carrito])

  const addToCart = (item: CartItem) => {
    const exist = carrito.some(({ id }) => id === item.id)

    if (exist) return undefined

    setCarrito([ ...carrito, item ])
  }

  const handleCompra = () => {
    if (total === 0) {
      alert("No se puede comprar $ " + total)
      return undefined
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "price": total
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch("http://localhost:3000/create-order", requestOptions)
      .then(response => {
        if (response.status < 300) return response.json()
      })
      .then(result => setPreferenceId(result.data.id))
      .catch(error => console.log('error', error));
  }

  return (
    <main style={{ display: 'grid', gridTemplateColumns: '1fr 300px' }}>
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
        <Card imageSrc={messiCampeon} price={100} onClick={() => addToCart({ id: 1, price: 100 })} />
        <Card imageSrc={messiMicro} price={60} onClick={() => addToCart({ id: 2, price: 60 })} />
        <Card imageSrc={comingSoon} />
      </section>
      <section style={{ padding: 16, borderLeft: "2px dotted white" }}>
        <h2>Carrito</h2>
        {
          carrito.map(
            item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p>{item.id}</p>
                <p>{item.price}</p>
              </div>
            )
          )
        }
        <hr />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p>{total}</p>
        </div>
        <button onClick={handleCompra}>Ir a pagar</button>
        {
          preferenceId && (
            <Wallet
              initialization={{ preferenceId }}
            />
          )
        }
      </section>
    </main>
  )
}

export default Home
