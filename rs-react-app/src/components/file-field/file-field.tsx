const FileField = () => {
  return (
    <div className="file-input">
      <label htmlFor="file" className="file-label">
        Choose image
      </label>
      <input type="file" id="file" name="file" hidden />
      <span>name</span>
    </div>
  );
};

export default FileField;
