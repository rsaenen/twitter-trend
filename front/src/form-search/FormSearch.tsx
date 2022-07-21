import { FC, useState } from 'react';
import { InputSearch } from '../input-search/InputSearch';

type FormSearchProps = {
  onSubmit: (value: FormSearchState) => void;
  onReset: () => void;
};

export type FormSearchState = {
  terms: string[],
  valid: boolean;
}

export const FormSearch: FC<FormSearchProps> = ({ onSubmit, onReset }) => {

  const [state, setState] = useState<FormSearchState>({
    terms: ['', ''],
    valid: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const terms = state.terms.slice();
    terms[index] = event.target.value;

    setState({
      terms,
      valid: terms.every(term => !!term.length),
    });
  }

  const handleSubmit = (event: React.SyntheticEvent): void => {
    if (state.valid) {
      onSubmit(state);
    }
    event.preventDefault();
  }

  const handleReset = (): void => {
    setState({
      terms: ['', ''],
      valid: false,
    });
    onReset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">

        {state.terms.map((term, index) => (
          <div className="col-lg-6" key={index}>
            <InputSearch value={term} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, index)} />
          </div>
        ))}

      </div>
      
      <div className="d-flex align-items-center">
        <button className="btn btn-primary me-3" type="submit">Go</button>
        <button className="btn btn-secondary me-3" type="button" onClick={handleReset}>Reset</button>
        <small>"Go" not working multiple times, reset the form first</small>
      </div>
    </form>
  );
}
