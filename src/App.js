import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';
import "./Coin.css"

function App() {

 const [coins, setCoins] = useState([]);
 const [search, setSearch] = useState("");

 useEffect(() => {
  axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'  )
    .then(res => {
      setCoins(res.data);
      console.log(res.data);
    })
    .catch(error => console.log(error));
}, []);
   
function handleChange(event){

  setSearch(event.target.value.trim());
}

const filteredCoins = coins.filter(coin=>{

  return coin.name.toLowerCase().includes(search.toLowerCase());
})

  return (
    <div className="coin-app">
      <div className="coin-search">
         <form onSubmit={(e)=>e.preventDefault()}>
          <input name="searchInput" className="coin-input" type="text" placeholder="search" onChange={handleChange}></input>
         </form>    
      </div>
      <div className='infoRow'><span id='s1'>Name</span> <span id='s2'>Symbol</span> <span id='s3'>Last Price</span> <span id='s4'>Total Volume</span> <span id='s5'>24h Change</span> <span id='s6'>Market Cap</span></div>
      
      { filteredCoins.length ===0  ?<h1 id='notfoundalert'>Not Found</h1>: filteredCoins.slice(0,6).map(coin=>{
       return (<Coin key={coin.id}
        image={coin.image}
        name={coin.name} 
        symbol={coin.symbol} 
        price={coin.current_price} 
        volume={coin.total_volume}
        priceChange={coin.price_change_percentage_24h}
        marketcap={coin.market_cap}
        />)
      })}
    </div>
  );
}

export default App;
