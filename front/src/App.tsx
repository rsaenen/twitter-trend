import 'bootstrap/dist/css/bootstrap.min.css';
import { FC, useEffect, useState } from 'react';
import { FormSearch, FormSearchState } from './form-search/FormSearch';
import { ResultSearch } from './result-search/ResultSearch';
import io from 'socket.io-client';

type SearchResult = {
  term: string;
  text: string;
}

type AppState = {
  results: {
    term: string;
    values: string[];
    count: number;
  }[];
  pending: boolean;
  ready: boolean;
}

const socket = io('http://localhost:3000');

export const App: FC = () => {
  const [state, setState] = useState<AppState>({
    results: [],
    pending: false,
    ready: false,
  });

  useEffect(() => {
    if (state.ready) {
      if (!socket.connected) {
        socket.connect();
      }

      socket.emit('search', { terms: state.results.map(res => res.term) });

      socket.on('result', (searchResult: SearchResult) => {
        const res = state.results.slice();
        res.forEach(result => {
          if (result.term === searchResult.term) {
            result.values.unshift(searchResult.text);
            if (result.values.length > 40) {
              result.values.pop();
            }
            result.count++;
          }
        })

        setState(state => ({
          ...state,
          results: res,
          pending: false,
        }));
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ready]);

  const handleSubmit = ({ terms }: FormSearchState): void => {
    setState(state => ({
      ...state,
      results: terms.map(term => ({ term, values: [], count: 0 })),
      pending: true,
      ready: true,
    }));
  }

  const handleReset = (): void => {
    setState(state => ({
      ...state,
      results: [],
      pending: false,
      ready: false,
    }));

    socket.disconnect();
  }

  return (
    <div className='container mt-5'>
      <div className='mb-3'>
        <FormSearch onSubmit={handleSubmit} onReset={handleReset} />
      </div>

      {state.pending ? (
        <div>Waiting for tweet, maybe you should try Biden vs Trump?</div>
      ) : (
        <div></div>
      )}

      <div>
        <ResultSearch results={state.results} />
      </div>
    </div>
  );
};
