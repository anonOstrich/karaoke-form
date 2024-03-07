import './SelfieInput.css';

export default function SelfieInput() {
  return (
    <div className="selfie-container">
      <label htmlFor="selfie">
        <span className="required">Kasvokuva</span>
        {/* Is this a faux pas? Inside the label it would open the file selection nicely... */}
        <div className="selfie-preview">+ Tuo kasvokuva</div>
      </label>

      <input type="file" id="selfie" name="selfie" accept="image/png,image/jpeg,image/jpg" capture="user" />
    </div>
  );
}
