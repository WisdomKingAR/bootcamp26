import { useState } from "react";
import "./App.css";
import heightIcon from "./assets/height icon.png";
import weightIcon from "./assets/weight icon.png";
import calculatorIcon from "./assets/calculator icon.png";
import resetIcon from "./assets/reset icon.png";
function App() {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const calculateBMI = () => {
      if (!height || !weight){
      setError("Please enter both height and weight.");
      setBmi(null);
      return;
    }
    setError("");
    if(height < 100 || height > 250){
      setError("Height must be 100cm - 250cm for human.");
      setBmi(null);
      return;
    }
    if(weight < 15 || weight > 300){
      setError("Weight must be 15kg - 300kg for human.");
      setBmi(null);
      return;
    }
    const heightInMeters = height / 100;
    const bmiValue = (
    weight / (heightInMeters * heightInMeters)
        ).toFixed(1);
    setBmi(bmiValue);
    if (bmiValue < 18.5){
    setCategory("Underweight");
    setMessage("You should focus on a nutritious diet.");
    }
    else if (bmiValue < 25){
    setCategory("Normal Weight");
    setMessage("Great! You have a healthy BMI.");
    }
    else if (bmiValue < 30){
    setCategory("Overweight");
    setMessage("Regular exercise and a balanced diet are recommended.");
    }
    else {
    setCategory("Obese");
    setMessage("Consider consulting a healthcare professional.");
    }
};
const resetBMI = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setCategory("");
    setMessage("");
    setError("");
};
const indicatorColor = 
    category === "Underweight" ? "#4da6ff" 
      : category === "Normal Weight" ? "#2ecc71"
      : category === "Overweight" ? "#f1c40f"
      : "#e74c3c";
let indicatorPosition = 0;
if(bmi !== null){
if (bmi <= 18.5) {
  indicatorPosition = (bmi / 18.5) * 25;
}
 else if (bmi <= 25) {
  indicatorPosition = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
}
 else if (bmi <= 30) {
  indicatorPosition = 50 + ((bmi - 25) / (30 - 25)) * 25;
}
 else {
  indicatorPosition = 75 + ((Math.min(bmi, 40) - 30) / 10) * 25;
}
}
    return(
      <div className="container">
        <div className={`app-container ${bmi? "show-result" :""}`}>
          <div className="card">
            <h1>BMI Calculator</h1>
            <p className="subtitle">
              Know your health instantly
            </p>
            <div className="input-group">
              <label>Height (cm)</label>
              <div className="input-box">
                <img src={heightIcon} alt="Height icon" className="icon"/>
                <input type="number" placeholder="Enter your height" value={height} 
                    onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label>Weight (kg)</label>
              <div className="input-box">
                <img src={weightIcon} alt="Weight icon" className="icon"/>
                <input type="number" placeholder="Enter your weight" value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
            <div className="button-group">
              <button className="calculate-btn" onClick={calculateBMI}>
                <img src={calculatorIcon} alt="Calculate" className="btn-icon"/>
                Calculate BMI
              </button>
              <button className="reset-btn" onClick={resetBMI}>
                <img src={resetIcon} alt="Reset" className="btn-icon"/>
                Reset
              </button>
            </div>
            <div className="formula-box">
              <h3>BMI Formula</h3>
              <p>BMI = Weight (kg) / Height (m²)</p>
            </div>
            {error && <p className="error">{error}</p>}
          </div>
          {bmi !== null && (
            <div className="result-card">
              <div className="result-box">
                <h2>Your BMI</h2>
                <h1>{bmi}</h1>
                <h3 style={{
                    color: indicatorColor
                  }}>
                  {category}
                </h3>
                <p className="result-message">{message}</p>
                <div className="bmi-scale">
                  <div className="scale-labels">
                    <span>Under</span>
                    <span>Normal</span>
                    <span>Over</span>
                    <span>Obese</span>
                  </div>
                  <div className="scale-bar">
                    <div className="indicator-wrapper" style={{
                        left: `${indicatorPosition}%`
                      }}>
                      <div className="indicator" style={{
                          background: indicatorColor
                        }}>
                      </div>
                      <div className="indicator-arrow" style={{
                            borderTopColor: indicatorColor
                        }}>
                      </div>
                      <div className="indicator-value">{bmi}</div>
                    </div>
                  </div>
                  <div className="scale-values">
                    <span>0</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40+</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
export default App;
