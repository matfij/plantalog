import { useState } from 'react';

export default function SearchForm() {
    const [hits, setHits] = useState([]);

    // todo - add debouncer
    const search = async (event) => {
        const query = event.target.value;
        if (query.length > 2) {
            const params = new URLSearchParams({ query });

            const res = await fetch('/api/search?' + params);

            const result = await res.json();
            setHits(result['plants']);
        }
    }

    return (
        <div>
            <input onChange={search} type="text"/>

            <ul>
                {hits.map((hit) => (
                    <li key={hit.entityId}>{hit.name} ({hit.vitamins})</li>
                ))}
            </ul>
        </div>
    );
}
