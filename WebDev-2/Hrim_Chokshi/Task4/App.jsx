import { useEffect, useState } from 'react'
import './App.css'


  {/*<div className={showPg2 ? 'b2' : 'pg1'}>
    {!showPg2 &&(
      <>
      <h1 id="first">Password Generator</h1>
      <button id="free" onClick={() => setShowPg2(true)}>Try Free</button>
      </>
    )
    }

    {!showPg2 &&(
      <h2>Creating Password</h2>
    )
    }
  </div>
)
}*/}

function App(){
  const [showPg2, setShowPg2] = useState(false)
  const [length, setLength] = useState(8)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [number, setNumber] = useState(true)
  const [symbol, setSymbol] = useState(true)
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (number) chars += "0123456789";
    if (symbol) chars += "!@#$%^&*()_+-=[]{}<>?";

    if (chars === ""){
      setPassword("Select any 1 option");
      return;
    }
    let pass = "";
    for(let i=0;i<length;i++){
      const randomIndex = Math.floor(Math.random()*chars.length);
      pass += chars[randomIndex];
    }
    setPassword(pass);
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Copied!")
  };

  useEffect(() => {
    generatePassword();
  }, [length, upper, lower, number, symbol])

  
return(

  <>
  {!showPg2 &&(
  <div className="pg1">
    <h1 id="first">Password Generator</h1>
    <button id="free" onClick={() => setShowPg2(true)}>Try Free</button>
    <ul id="uses"><li>Creates strong, random and unique passwords</li>
                  <li>Generates secure combinations of letters, numbers, and special characters for each account.</li>   
                  <li>Reduces the risk of unauthorized access and protects personal information from cyberattacks.</li> 
                  <li>Saves time by creating secure passwords instantly, and when used along with a password manager, they make it easier to maintain different passwords for multiple websites.</li>
    </ul>
  </div>
  )
}
{showPg2 && (
  <div className="b2">
    <h2 id="second">Creating password</h2>

    <div className="output-box">
      <div className="output-top">
        <span>{password}</span>
        <button className="refresh-btn" onClick={generatePassword}>&#x27F3;</button>
      </div>
      <button className="copy-btn" onClick={copyPassword}>Copy password</button>
    </div>

    <div className="card">
    <h3>Password Length: <span>{  length  }</span></h3>
    <input type="range"
           min="4"
           max="20"
           value={length}
           onChange={(e) => setLength(e.target.value)}
           className="slider" />

           <h3>Characters used:</h3>
           <div className="checkbox-grid">
            <label><input type="checkbox" checked={upper} onChange={() =>setUpper(!upper)}/>Uppercase</label>
            <label><input type="checkbox" checked={lower} onChange={() =>setLower(!lower)}/>Lowercase</label>
            <label><input type="checkbox" checked={number} onChange={() =>setNumber(!number)}/>Numbers</label>
            <label><input type="checkbox" checked={symbol} onChange={() =>setSymbol(!symbol)}/>Symbols</label>
           </div>
    </div>
  </div>
)
}
  </>
)
}




export default App
