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
    <main className="bg-slate-50 min-h-screen">
      <div className="px-4 md:px-6 lg:px-8 mx-auto max-w-4xl py-16">
        <h1 className="text-4xl font-semibold text-center mb-10">
          {strings.title}
        </h1>

        <FormSearchFlights />
      </div>
    </main>
  );
};

export default PageHome;
