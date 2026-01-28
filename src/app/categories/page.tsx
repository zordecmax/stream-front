import CategoryCard from '@/components/CategoryCard';

export default function Categories() {

  return (
    <>
      <h1 className='text-3xl font-bold'>Kategorien</h1>

      <div className="flex gap-5 w-full overflow-x-auto min-w-0 scroll-macos">
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
          viewers={18040}
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
          viewers={96401}
          category="Action"
          image="images/thumbnails/06.png"
        />

        <CategoryCard
          title="Musik"
          viewers={39441}
          category="IRL"
          image="images/thumbnails/07.png"
        />
      </div>

      <h2 className='text-3xl font-bold mt-8'>Für dich empfohlen</h2>

      <div className="flex gap-5 w-full overflow-x-auto min-w-0 scroll-macos">
        <CategoryCard
          title="DiE GRÖSSTE SPENDE ALLER ZEITEN!"
          image="images/vertical/01.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Schnelles Letsplay"
          image="images/vertical/02.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Wie ich von 0 auf 100 Zuschauer..."
          image="images/vertical/03.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Warum ich in Fortnite nicht..."
          image="images/vertical/04.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="EAFC 25: Ab Erscheinungs..."
          image="images/vertical/05.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Ich werde das NIEMALS spielen..."
          image="images/vertical/06.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Das geheime Ende NEIN AN..."
          image="images/vertical/07.png"
          width="min-w-[150px] w-[150px]"
        />
        <CategoryCard
          title="Level 1 vs. Level 100"
          image="images/vertical/08.png"
          width="min-w-[150px] w-[150px]"
        />
      </div>

    </>
  );
}
