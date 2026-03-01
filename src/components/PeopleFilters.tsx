import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

const centuryFilter = [
  { title: '16' },
  { title: '17' },
  { title: '18' },
  { title: '19' },
  { title: '20' },
];

export const PeopleFilters = () => {
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const getLink = (sex: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (sex) {
      params.set('sex', sex);
    } else {
      params.delete('sex');
    }

    return `/people?${params.toString()}`;
  };

  const handleCenturyClick = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const centuries = params.getAll('centuries');

    if (centuries.includes(century)) {
      // Remove century
      params.delete('centuries');
      centuries
        .filter(c => c !== century)
        .forEach(c => params.append('centuries', c));
    } else {
      // Add century
      params.append('centuries', century);
    }

    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(search);
  };

  useEffect(() => {
    const quer = searchParams.get('query') ?? '';

    setQuery(quer);
  }, [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <NavLink
          className={({ isActive }) => (isActive ? 'is-active' : '')}
          to={getLink(null)}
        >
          All
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'is-active' : '')}
          to={getLink('m')}
        >
          Male
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'is-active' : '')}
          to={getLink('f')}
        >
          Female
        </NavLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            value={query}
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          {centuryFilter.map(filter => {
            const isActive = searchParams
              .getAll('centuries')
              .includes(filter.title);

            return (
              <button
                key={filter.title}
                className={classNames('button mr-1', { 'is-info': isActive })}
                onClick={() => handleCenturyClick(filter.title)}
              >
                {filter.title}
              </button>
            );
          })}

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                pathname: '/people',
                search: getSearchWith(searchParams, {
                  centuries: null,
                }).toString(),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
