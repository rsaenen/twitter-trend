import { FC } from 'react';
import { ResultChart } from '../result-chart/ResultChart';
import { ResultList } from '../result-list/ResultList';

type ResultSearchProps = {
  results: {
    term: string;
    values: string[];
    count: number;
  }[];
};

export const ResultSearch: FC<ResultSearchProps> = ({ results }) => {
  return (
    <div className="row">
      {results.map((result, index) => (
        <div className="col-lg-6" key={index}>
          <ResultList values={result.values} />
        </div>
      ))}

      {results.length === 2 && (
        <div className="col-12">
          <ResultChart results={results} />
        </div>
      )}
    </div>
  );
}
