import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

const centryFilter = [
  { id: 'centuries=16', title: '16' },
  { id: 'centuries=17', title: '17' },
  { id: 'centuries=18', title: '18' },
  { id: 'centuries=19', title: '19' },
  { id: 'centuries=20', title: '20' },
];

export const PeopleFilters = () => {
  const [query, setQuery] = useState('');
  const { filterId } = useParams();
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
          {centryFilter.map(filter => (
            <div key={filter.id} className="level-left">
              <Link
                data-cy="century"
                className={classNames(
                  {
                    'is-info': filterId === filter.id,
                  },
                  'button mr-1 ',
                )}
                to={`#/people?${filter.id}`}
              >
                {filter.title}
              </Link>
            </div>
          ))}

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
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
