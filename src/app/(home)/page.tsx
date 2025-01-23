import { type Metadata } from 'next';
import { FormSearchFlights } from './form-search-flights';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Here you can search for the best flight prices around the world',
};

const strings = {
  title: 'Search for flights',
};

const PageHome = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 lg:px-8">
        <h1 className="mb-10 text-center text-4xl font-semibold">
          {strings.title}
        </h1>

        <FormSearchFlights />
      </div>
    </main>
  );
};

export default PageHome;
