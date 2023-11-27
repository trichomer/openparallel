import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    const walletAddress = process.env.REACT_APP_TEST_WALLET_ADDRESS;
    const collection = "parallelalpha";
    const chain = "ethereum";
    const limit = 50;
    const key = process.env.REACT_APP_OPENSEA_API_KEY;
    const headers = {
      'X-API-KEY': key,
    };

    const fetchNFTs = async () => {
      try {
        const url = `https://api.opensea.io/api/v2/chain/${chain}/account/${walletAddress}/nfts?collection=${collection}&limit=${limit}`;
        const response = await axios.get(url, { headers });

        const nfts = response.data.nfts || [];
        
        setNftList(nfts);
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
