import CategoryCard from '@/components/CategoryCard';

export default function Categores() {

  return (
    <>
      <h1 className='text-3xl font-bold'>Kategorien</h1>

      <div className="flex gap-5 flex-wrap w-fit overflow-x-auto">
        <CategoryCard
          title="Grand Theft Auto"
          viewers={128404}
          category="IRL"
          image="images/thumbnails/01.png"
        />

        <CategoryCard
          title="IRL"
          viewers={89404}
          category="Abenteuer"
          image="images/thumbnails/02.png"
        />

        <CategoryCard
          title="EAFC"
          viewers={18948}
          category="Action"
          image="images/thumbnails/03.png"
        />

        <CategoryCard
          title="Sport"
          viewers={1804}
          category="Abenteuer"
          image="images/thumbnails/04.png"
        />

        <CategoryCard
          title="Fortnite"
          viewers={39441}
          category="Action"
          image="images/thumbnails/05.png"
        />

        <CategoryCard
          title="Interaktion"
          viewers={39441}
          category="Action"
          image="images/thumbnails/06.png"
        />
      </div>

        <h2 className='text-3xl font-bold mt-8'>Für dich empfohlen</h2>

        <div className="flex gap-5 flex-wrap w-fit overflow-x-auto">
          <CategoryCard
            title="Grand Theft Auto"
            category="IRL"
            image="images/vertical/01.png"
          />
          <CategoryCard
            title="Grand Theft Auto"
            category="IRL"
            image="images/vertical/02.png"
          />
          <CategoryCard
            title="Grand Theft Auto"
            category="IRL"
            image="images/vertical/03.png"
          />
          <CategoryCard
            title="Grand Theft Auto"
            category="IRL"
            image="images/vertical/04.png"
          />
          <CategoryCard
            title="Grand Theft Auto"
            category="IRL"
            image="images/vertical/05.png"
          />
          <CategoryCard
            title="Grand Theft Auto"
            category="IRL"
            image="images/vertical/06.png"
          />
          <CategoryCard
            title="Grand Theft Auto"
            category="IRL"
            image="images/vertical/07.png"
          />
        </div>
    </>
  );
}
