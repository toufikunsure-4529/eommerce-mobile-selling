import SearchPageClient from "./SearchPageClient";

const SearchPage = ({ searchParams }) => {
    const searchTerm = searchParams?.query || ""; // Get query parameter

    return <SearchPageClient initialSearchTerm={searchTerm} />;
};

export default SearchPage;
