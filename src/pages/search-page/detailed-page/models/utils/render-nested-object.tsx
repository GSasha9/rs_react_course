const renderNestedObject = (obj: Record<string, unknown>) => (
  <ul className="nested-list">
    {Object.entries(obj).map(([subKey, subValue]) =>
      subValue === null ||
      subValue === false ||
      typeof subValue === 'object' ? null : (
        <li key={subKey}>
          <strong>{subKey}:</strong> {String(subValue)}
        </li>
      )
    )}
  </ul>
);

export default renderNestedObject;
