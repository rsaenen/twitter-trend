import { FC } from 'react';

type InputSearchType = {
  value: string;
  onChange: any;
}

export const InputSearch: FC<InputSearchType> = ({ value, onChange }) => {

  return (
    <div className="form-group">
      <input
        className="form-control"
        type="text"
        placeholder="Terme"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
