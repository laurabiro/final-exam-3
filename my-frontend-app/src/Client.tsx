import { Data } from "./GetVets.tsx";

function Client({ client }: { client: Data }) {

    return (
        <div key={client.name}>
      <h2>{client.name}</h2>
      {client.pets.map((pet) => (
        <div key={pet.name}>
          <p>
            {pet.name} - Vaccinated: {pet.isVaccinated ? 'true' : 'false'}
          </p>
        </div>
      ))}
    </div>
    );
  }

  export default Client;