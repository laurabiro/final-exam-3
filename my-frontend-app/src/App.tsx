import  { useState, useEffect } from 'react';
import Client from './Client';
import { Data, searchClientsData } from "./GetVets"

const App = () => {
  const [clients, setClients] = useState<Data[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState<boolean>(true);


  useEffect(() => {
    setIsSearchButtonDisabled(userInput.length < 3);
  }, [userInput]);

  function capitalizeUserInput(str:string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleSearch = async () => {
    if (userInput.length >= 3) {

      try {
        const result = await searchClientsData(capitalizeUserInput(userInput));
        if (result.success) {
          const data = result.data;
          setClients(data);
        }

      } catch (error) {
        console.error("Error in handleSearch:", error);
      }
    }
  };
  
  return (
    <div>
      <nav className="p-4 bg-white text-black">Veterinarian admin - clients</nav>
      <input
        type="text"
        placeholder="Enter at least 3 characters"
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
      />
      <button onClick={handleSearch} disabled={isSearchButtonDisabled}>
        Search
      </button>
      <div>
      {clients.length > 0 ? (
        clients.map((client) => (
          <Client
            key={client.name}
            client={client}
          />
        ))
        
      ) : (
        <p>no clients here.</p>
      )}
      </div>
    </div>
  );
};

export default App;