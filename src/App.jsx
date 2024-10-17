import { useState } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import './App.css';

function App() {
  const [interest, setInterest] = useState(0);
  const [principle, setPrinciple] = useState(0);
  const [rate, setRate] = useState(0);
  const [year, setYear] = useState(0);

  const [invalidPrinciple, setInvalidPrinciple] = useState(false);
  const [invalidRate, setInvalidRate] = useState(false);
  const [invalidYear, setInvalidYear] = useState(false);

  const validateInput = (inputTag) => {
    const { name, value } = inputTag;

    const isValid = !!value.match(/^\d*\.?\d+$/);

    if (name === 'principle') {
      setPrinciple(value);
      setInvalidPrinciple(!isValid);
    } else if (name === 'rate') {
      setRate(value);
      setInvalidRate(!isValid);
    } else if (name === 'year') {
      setYear(value);
      setInvalidYear(!isValid);
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault()
    if (principle && rate && year) {
      setInterest((principle * rate * year) / 100);
    } else {
      alert('Please fill the form completely');
    }
  };

  const handleReset = () => {
    setPrinciple(0);
    setRate(0);
    setYear(0);
    setInterest(0);
    setInvalidPrinciple(false);
    setInvalidRate(false);
    setInvalidYear(false);
  };

  return (
    <div
      style={{ width: '100%', minHeight: '100vh' }}
      className="d-flex justify-content-center align-items-center bg-dark"
    >
      <div style={{ width: '600px' }} className="bg-light rounded p-5">
        <h3>Simple Interest Calculator</h3>
        <p>Calculate your simple Interest Easily</p>
        <div className="bg-warning p-5 rounded">
          <h1>₹ {interest}</h1>
          <p className="fw-bolder">Total Simple Interest</p>
        </div>
        <form className="mt-5">
          <div className="mb-3">
            <TextField
              name="principle"
              value={principle || ""}
              onChange={(e) => validateInput(e.target)}
              className="w-100"
              id="outlined-principle"
              label="₹ Principle Amount"
              variant="outlined"
            />
          </div>
          {invalidPrinciple && (
            <div className="mb-3 text-danger fw-bolder">Invalid Principle Amount</div>
          )}

          <div className="mb-3">
            <TextField
              name="rate"
              value={rate || ""}
              onChange={(e) => validateInput(e.target)}
              className="w-100"
              id="outlined-rate"
              label="Rate of Interest (%)"
              variant="outlined"
            />
          </div>
          {invalidRate && <div className="mb-3 text-danger fw-bolder">Invalid Rate!</div>}

          <div className="mb-3">
            <TextField
              name="year"
              value={year || ""}
              onChange={(e) => validateInput(e.target)}
              className="w-100"
              id="outlined-year"
              label="Time Period (Yr)"
              variant="outlined"
            />
          </div>
          {invalidYear && <div className="mb-3 text-danger fw-bolder">Invalid Year!</div>}

          <Stack direction="row" spacing={2}>
            <Button
              type='submit'
              onClick={handleCalculate}
              disabled={invalidPrinciple || invalidRate || invalidYear}
              variant="contained"
              className="bg-dark"
              style={{ width: '50%', height: '70px' }}
            >
              Calculate
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
              style={{ width: '50%', height: '70px' }}
              className="border border-dark text-dark"
            >
              Reset
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
}

export default App;
