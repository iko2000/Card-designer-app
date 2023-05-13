import { type } from "os";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { couldStartTrivia } from "typescript";
import complete from "./images/complete.svg"

function App() {
  const [cardnum, setCardnum] = useState<any>(null);
  const [name, setName] = useState<any>("");
  const [month, setMonth] = useState<any>(null);
  const [year, setYear] = useState<any>(null);
  const [cvc, setCvc] = useState<any>(null);
  const [error, setError] = useState(false);
  const [nameerror, setNameerror] = useState(false);
  const [cvcerror, setCvcerror] = useState(false);
  const [dateerror, setDateerror] = useState(false);
  const [issubmited, setIssubmited] = useState(false);
  const [montherror, setmonthError] = useState(false);
  const [yearerror, setyearError] = useState(false);

 

  const detector = useRef(0);
  
  function format(s:any) {
    return s.toString().replace(/\d{4}(?=.)/g, '$& ');
}
  useEffect(() => {
    if(Number(month) > 12) {
      setmonthError(true);
      setMonth("00");

    }

 
  }, [cardnum, name, month, year, cvc]);

 

  return (
    <div className="App">
      <div className="box">
        <div className="mask">
          <div className="front">
            <div className="icon">
              <div className="icons">
                <div className="bigball"> </div>
                <div className="smalball"> </div>
              </div>
            </div>
            <div className="cardnumber">
              <p>{cardnum ? format(cardnum) : "5555 5555 5555 5555"}</p>
            </div>
            <div className="nameanddate">
              <div>
                <p>{name ? name : "Chris Morganson"}</p>
                <p>
                  {month ? month : "00"}/{year ? year : "00"}
                </p>
              </div>
            </div>
          </div>
          <div className="back">
            <p>{cvc ? cvc : "123"}</p>
          </div>
        </div>
        <div className="inputs">
          <div className={issubmited ? "active" : "passive" }>
           <img src={complete}/>
            <h4>THANK YOU</h4>
            <p>We've added your credit card details</p>
            <button>Continue</button>
          </div>
          <div className={issubmited ? "submited" : "inputfield"}>
            <div className="name">
              <label>CARDHOLDER NAME </label>
              <input
                value={name}
                maxLength={25}
                placeholder="e.g Jane Appleased"
                className="inp"
                onChange={(e) => {
                  const regex = /^[A-Za-z-' ']+$/;
                  if (e.target.value === "" || regex.test(e.target.value)) {
                    setName(e.target.value);
                    setNameerror(false);
                  } else {
                    setNameerror(true);
                    setName("");
                  }
                }}
              />
            </div>
            {nameerror ? (
              <p className="errormessage">Wrong format, Letters only</p>
            ) : null}

            <div className="name">
              <label>CARD NUMBER</label>
              <input
             
                pattern="[0-9]"
                value={cardnum}
                maxLength={16}
                placeholder="e.g 1323 3333 4444 5555"
                className="inp"
                onChange={(e) => {
                  const regex = /^[0-9\b]+$/;
                  if (e.target.value === "" || regex.test(e.target.value)) {
                    setCardnum(e.target.value);
                    setError(false);
                  } else {
                    setError(true);
                    setCardnum(0);
                  }
                }}
              />
            </div>
            {error ? (
              <p className="errormessage">Wrong format, Numbers only</p>
            ) : null}

            <div className="details">
              <div>
                <label className="lab">EXP.DATE MM/YY</label>
                <div className="positioner">
                  <input
                    value={month}
                    maxLength={2}
                    placeholder="MM"
                    onChange={(e) => {
                      const regex = /^[0-9\b]+$/;
                      if (e.target.value === "" || regex.test(e.target.value)) {
                        setMonth(e.target.value);
                        setDateerror(false);
                        setmonthError(false);
                      } else {
                        setDateerror(true);
                        setMonth("00");
                      }

                  
                    }}
                  />
                  <input
                    value={year}
                    maxLength={2}
                    placeholder="YY"
                    onChange={(e) => {
                      const regex = /^[0-9\b]+$/;
                      if (e.target.value === "" || regex.test(e.target.value)) {
                        setYear(e.target.value);
                        setDateerror(false);
                        setyearError(false);

                      } else {
                        setDateerror(true);
                        setYear("00");
                      }
                    }}
                  />
                </div>
              </div>

              <div className="cvc">
                <label>CVC</label>
                <input
                  value={cvc}
                  maxLength={3}
                  placeholder="e.g 123"
                  onChange={(e) => {
                    setCvc(e.target.value);
                    const regex = /^[0-9\b]+$/;
                    if (e.target.value === "" || regex.test(e.target.value)) {
                      setCvc(e.target.value);
                      setCvcerror(false);
                      
                    } else {
                      setCvcerror(true);
                      setCvc(0);
                    }
                  }}
                />
              </div>
            </div>
            {yearerror ? (
              <p className="errormessage">Year should be more than 23</p>
            ) : null}
            {cvcerror ? (
              <p className="errormessage">Wrong format, Numbers only</p>
            ) : null}
            {dateerror ? (
              <p className="errormessage">Wrong format, Numbers only</p>
            ) : null}
             {montherror ? (
              <p className="errormessage">Months should be under 12</p>
            ) : null}
            <div className="btn">
              <button
                onClick={() => {
                  if(name !== null && cvc !== null && cardnum !== null && month !== null && year !== null) {
                    setIssubmited(true);
                  } else {
                    alert('Not all forms are filled, Please try again')
                  }

                  if(Number(year) < 23) {
                    setyearError(true);
                    setYear(null);
                    
                  }

                 
                 
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
