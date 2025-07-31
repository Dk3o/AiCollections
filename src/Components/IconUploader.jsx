import styles from "../styles/components/IconUploader.module.scss";

export default function IconUploader({ icon, onChange }) {
  return (
    <div>
      <label htmlFor="icon" className='custom-file-label'>
        Upload icon (PNG or SVG)
      </label>
      <div className={styles.fileUploadHolder}>
        <input
          type="file"
          id="icon"
          name="icon"
          accept="image/png, image/svg+xml"
          className={styles.fileUploadInput}
          onChange={onChange}
        />
        {icon && (
          <div className={styles.iconPreview}>
            <img
              src={icon}
              alt="Preview"
              style={{ width: "48px", height: "48px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
