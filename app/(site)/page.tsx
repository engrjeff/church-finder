import SearchBar from "@/components/search-bar";

export default function Home() {
  return (
    <>
      <div className="h-screen bg-[url('/assets/hero-img-1.jpg')] bg-center bg-no-repeat bg-cover relative">
        <section className='inset-0 w-full h-full bg-black/80'>
          <div className='container max-w-5xl h-full w-full flex flex-col items-center justify-center'>
            <h1 className='text-6xl font-bold text-white mb-6 text-center'>
              Let us find a Church for you!
            </h1>
            <h2 className='text-2xl text-white text-center mb-6'>
              Every believer of Christ should have a home.
            </h2>
            <SearchBar />
          </div>
        </section>
      </div>
      <section>
        <div>
          <h3>Recently Added</h3>
        </div>
      </section>
    </>
  );
}
