import { FC } from 'react';

type ResultListProps = {
  values: string[];
}

export const ResultList: FC<ResultListProps> = ({ values }) => {
  return (
    <ul className="list-group">
      {values.map((value, index) => (
        <li className="list-group-item" key={index}>{value}</li>
      ))}
    </ul>
  )
}
