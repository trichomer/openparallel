import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    const walletAddress = process.env.REACT_APP_TEST_WALLET_ADDRESS;
    const fetchNFTs = async () => {
      try {
        const response = await axios.get(`https://api.opensea.io/api/v1/assets?owner=${walletAddress}&order_direction=desc&offset=0&limit=20`);
        setNftList(response.data.assets);
      } catch (error) {
        console.error("Error fetching NFTs: ", error);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      <h1>Parallel Alpha</h1>
      {nftList.map((nft, index) => (
        <div key={index}>
          <p>{nft.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
