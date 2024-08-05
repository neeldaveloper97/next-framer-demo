"use-client"

import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale, locales, defaultLocale, pathname, query } = router;

  return (
    <div className="fixed top-4 right-16">
      {locales.map((loc) => (
        <Link 
          href={{ pathname, query }} 
          locale={loc} 
          key={loc}
        >
          <button
            className={`mx-2 px-4 py-2 rounded ${
              locale === loc ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {loc.toUpperCase()}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
