import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getRawGames } from '../../../data/games-api';

const GENRE_FILTERS = [
    { label: 'Todos', value: '' },
    { label: 'Accion', value: 'action' },
    { label: 'Rol', value: 'role-playing-games-rpg' },
    { label: 'Estrategia', value: 'strategy' },
    { label: 'Shooter', value: 'shooter' },
    { label: 'Aventura', value: 'adventure' },
    { label: 'Deportes', value: 'sports' },
    { label: 'Carreras', value: 'racing' },
];

const PAGE_SIZE = 20;

export const GamesCatalogue = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [debouncedSearchText, setDebouncedSearchText] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const loadMoreRef = useRef(null);

    const loadGames = useCallback((nextPage, shouldReplace = false) => {
        if (shouldReplace) {
            setLoading(true);
        } else {
            setLoadingMore(true);
        }
        setError('');

        return getRawGames({
            page: nextPage,
            page_size: PAGE_SIZE,
            ordering: '-added',
            search: debouncedSearchText,
            genres: selectedGenre,
        })
            .then((response) => {
                const results = Array.isArray(response.results) ? response.results : [];
                setGames((currentGames) => shouldReplace ? results : [...currentGames, ...results]);
                setHasMore(Boolean(response.next));
                setPage(nextPage);
            })
            .catch((error) => {
                console.error(error);
                setError('No hemos podido cargar el catalogo de juegos ahora mismo.');
            })
            .finally(() => {
                setLoading(false);
                setLoadingMore(false);
            });
    }, [debouncedSearchText, selectedGenre]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearchText(searchText.trim());
        }, 350);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchText]);

    useEffect(() => {
        loadGames(1, true);
    }, [loadGames]);

    useEffect(() => {
        const sentinel = loadMoreRef.current;

        if (!sentinel || loading || loadingMore || !hasMore || error) {
            return undefined;
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadGames(page + 1);
            }
        }, { rootMargin: '280px' });

        observer.observe(sentinel);

        return () => {
            observer.disconnect();
        };
    }, [error, hasMore, loadGames, loading, loadingMore, page]);

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const clearFilters = () => {
        setSearchText('');
        setSelectedGenre('');
    };

    const hasActiveFilters = searchText || selectedGenre;

    const renderFilters = () => (
        <div className="catalogueFilters">
            <div className="catalogueFilterField catalogueSearchField">
                <label htmlFor="catalogue-search">Buscar por nombre</label>
                <input
                    id="catalogue-search"
                    type="search"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Elden Ring, Portal, Doom..."
                />
            </div>
            <div className="catalogueFilterField">
                <label htmlFor="catalogue-genre">Tipo de juego</label>
                <select id="catalogue-genre" value={selectedGenre} onChange={handleGenreChange}>
                    {GENRE_FILTERS.map((genre) => (
                        <option key={genre.value || 'all'} value={genre.value}>{genre.label}</option>
                    ))}
                </select>
            </div>
            <button className="catalogueClearFilters" type="button" onClick={clearFilters} disabled={!hasActiveFilters}>
                Reset
            </button>
        </div>
    );

    const renderIntro = () => (
        <div className="catalogueIntro">
            <div>
                <span className="catalogueStateKicker">RAWG catalogue</span>
                <p>Juegos populares ordenados por impacto en la comunidad. Baja para cargar mas.</p>
            </div>
            <span className="catalogueCount">{games.length} loaded</span>
        </div>
    );

    const renderGameGrid = () => (
        <>
            <div className="catalogueGrid">
                {games.map((game) => (
                    <article className="catalogueGameCard" key={game.id}>
                        <div className="catalogueGameCover">
                            {game.background_image ? (
                                <img src={game.background_image} alt={game.name} />
                            ) : (
                                <div className="catalogueGameCoverFallback">No image</div>
                            )}
                        </div>
                        <div className="catalogueGameBody">
                            <h3>{game.name}</h3>
                            <div className="catalogueGameMeta">
                                {game.released ? <span>{game.released}</span> : null}
                                {game.rating ? <span>{game.rating}/5</span> : null}
                                {game.added ? <span>{game.added} players</span> : null}
                            </div>
                            <div className="catalogueGenreList">
                                {(game.genres || []).slice(0, 3).map((genre) => (
                                    <span key={genre.id}>{genre.name}</span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
            <div className="catalogueLoadMore" ref={loadMoreRef}>
                {loadingMore ? 'Loading more games...' : hasMore ? 'Keep scrolling' : 'End of catalogue'}
            </div>
        </>
    );

    if (loading && !games.length) {
        return (
            <section className="gamesCatalogue">
                {renderFilters()}
                <div className="catalogueStatePanel">
                    <span className="catalogueStateKicker">RAWG sync</span>
                    <h2>Loading game catalogue</h2>
                    <p>Estamos conectando con RAWG y trayendo juegos populares para Jegty.</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="gamesCatalogue">
                {renderFilters()}
                <div className="catalogueStatePanel catalogueStatePanelError">
                    <span className="catalogueStateKicker">Catalogue offline</span>
                    <h2>No games loaded</h2>
                    <p>{error}</p>
                    <p className="catalogueStateHint">Revisa que `REACT_APP_RAWG_API_KEY` este configurada y reinicia el servidor de desarrollo si acabas de cambiar el `.env`.</p>
                </div>
            </section>
        );
    }

    if (!games.length) {
        return (
            <section className="gamesCatalogue">
                {renderFilters()}
                <div className="catalogueStatePanel">
                    <span className="catalogueStateKicker">Empty catalogue</span>
                    <h2>No hay juegos disponibles</h2>
                    <p>No hay resultados para esos filtros. Prueba otro nombre o tipo de juego.</p>
                    {hasActiveFilters ? <button className="catalogueClearFilters catalogueClearFiltersLarge" type="button" onClick={clearFilters}>Limpiar filtros</button> : null}
                </div>
            </section>
        );
    }

    return (
        <section className="gamesCatalogue">
            {renderFilters()}
            {renderIntro()}
            {renderGameGrid()}
        </section>
    );
};
