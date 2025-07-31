const renderNestedObject = (obj: Record<string, unknown>) => (
  <ul className="nested-list">
    {Object.entries(obj).map(([subKey, subValue]) =>
      subValue === null ||
      subValue === false ||
      subKey === 'uid' ||
      typeof subValue === 'object' ? null : (
        <li key={subKey}>
          <strong>{subKey}:</strong>{' '}
          {Array.isArray(subValue) && subValue.length === 0
            ? 'No data'
            : String(subValue)}
        </li>
      )
    )}
  </ul>
);

export default renderNestedObject;
