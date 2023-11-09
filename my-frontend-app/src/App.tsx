import { Data, loadLaptopsNow } from './GetLaptops'
import './index.css'
import { useEffect, useState } from 'react'

function App() {
  const [ isLoading, setIsLoading ] = useState(true)
  const [ laptops, setLaptops ] = useState<Data[]>([])
  const [ showmore, setShowmore ] = useState<number | null>(null)
  const [ search, setSearch ] = useState<string>("")
  const [ isSortingAsc, setIsSortingAsc ] = useState<boolean>(true)

  useEffect(() => {
    const load = async () => {
      const result = await loadLaptopsNow();
      if (result.success) {
        const data = result.data
        setLaptops(data)
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleShow = (index:number) => {

    setShowmore(showmore === index ? null : index)
  }

  const handleSort = () => {
    const sortedLaptops = [...laptops]

    sortedLaptops.sort((a, b) => {
      const sizeA = a.weight
      const sizeB = b.weight
      return isSortingAsc ? sizeA - sizeB : sizeB - sizeA
    })

    setLaptops(sortedLaptops)
    setIsSortingAsc(!isSortingAsc)
  }

  const filteredLaptops = laptops.filter((laptop) =>
    laptop.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    
    <div className='h-screen'>
      <header className='p-6 bg-slate-200 flex justify-between items-center gap-36'>
        <div className='text-black font-mono flex-1'>ALLLAPTOPS.COM</div>
        <input className="bg-white text-black font-semibold rounded p-1 border-solid border-black border-[.05em] flex-1" type="text" 
          placeholder="type name" 
          value={ search } 
          onChange={ ((e) => setSearch(e.target.value)) }
        />
        <button className=' bg-slate-950 rounded p-2 font-bold flex-1' onClick={ handleSort } > 
          { isSortingAsc ? " SHOW LAPTOPS FROM LIGHTEST TO HEAVIEST" : "SHOW LAPTOPS FROM HEAVIEST TO LIGHTEST" }
        </button>
      </header>

      { isLoading ? (
          <div className='text-center pt-20'>LOADING MFS . . .</div>
        ) : (
          <div className='flex justify-center rounded-t-none rounded border-slate-200 border-2 border-solid h-3/4'>
            <div className='flex'>
            { filteredLaptops.map(( item, index ) => (
              <div key={ index } className=' flex flex-col p-4 gap-4 pt-20'>
                <div className='p-4 text-center'>{ item.name }</div>
                <button className=' text-black bg-slate-300 rounded text-lg p-2 w-40' 
                  onClick={ () => handleShow(index+1) }>
                    { showmore === index+1  ? "SHOW LESS" : "SHOW MORE" }</button>
                { showmore === index+1 && 
                <div>
                  <div className=' text-center'>{ item.brand }</div>
                  <div className=' text-center'>{ item.weight } kg</div>
                </div>
                }
              </div>
            ))}
            </div>
          </div>
        )
        }

    </div>
  )
}

export default App

