import { useParams } from 'react-router-dom'
import {Data, loadVetsNow  } from './GetVets'
import './index.css'
import { useCallback, useEffect, useState } from 'react'

function App() {

  const { search } = useParams()
  const [ isLoading, setIsLoading ] = useState(true)
  const [ clients, setClients ] = useState<Data[]>([])
  const [ load, setLoad ] = useState<string>("")
  const [ isButtonDisabled, setIsButtonDisabled ] = useState(true)

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    try {
      let result;

      if (load.trim() === '') {
        result = await loadVetsNow('');
      } else {
        result = await loadVetsNow(load);
      }

      if (result.success) {
        const data = result.data;
        setClients(data);
        setIsLoading(false);
      } else {
        // Handle error or show a message
        console.error('Failed to load clients:', result.status);
        setIsLoading(false);
      }
    } catch (error) {
      // Handle error or show a message
      console.error('Error during client search:', error);
      setIsLoading(false);
    }
  }, [load]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoad(e.target.value)
    setIsButtonDisabled(e.target.value.length < 3)
  }

  useEffect(() => {
    // You may want to load data initially when the component mounts
    handleSearch();
  }, [handleSearch]);
  
  return (
    
    <div className='h-screen'>

      <header className='p-6 bg-slate-200 flex justify-between items-center gap-36'>
        <div className='text-white bg-black font-mono flex-1'>Veterinarian admin - clients</div>
      </header>

      <div>
         <input className="bg-white text-black font-semibold rounded p-1 border-solid border-black border-[.05em] flex-1" type="text" 
            placeholder="type name" 
            value={ search } 
            onChange={ handleInputChange }
          />
          <button onClick={ handleSearch  } disabled={isButtonDisabled}>SEARCH</button>
      </div>
      
      { isLoading ? (
          <div className='text-center pt-20'>. . .</div>
        ) : (
          <div className="flex justify-center rounded-t-none rounded border-slate-200 border-2 border-solid h-3/4">
          <div className="flex">
            {clients.length > 0 ? (
              clients.map((item, index) => (
                <div key={index} className="flex flex-col p-4 gap-4 pt-20">
                  <div className="text-white">{item.name}</div>
                  <div className="text-white">Pets:</div>
                  {item.pets.map((pet, petIndex) => (
                    <div key={petIndex} className="text-white">
                      {`- ${pet.name} (${pet.animal}) Vaccinated: ${pet.isVaccinated ? 'Yes' : 'No'}`}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="text-white">No clients found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

