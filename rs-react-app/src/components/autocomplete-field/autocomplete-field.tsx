interface AutocompleteFieldProps {
  htmlFor: string;
  listID: string;
  id: string;
  name: string;
  options: string[];
}

const AutocompleteField = ({
  htmlFor,
  listID,
  id,
  name,
  options,
}: AutocompleteFieldProps) => {
  return (
    <div className="autocomplete-field">
      <label htmlFor={htmlFor}>Select Country</label>
      <input list={listID} id={id} name={name} />
      <datalist id={listID}>
        {options.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </div>
  );
};

export default AutocompleteField;
