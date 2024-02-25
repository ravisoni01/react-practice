import { useState } from "react";
import "./style.css";
import { useRef } from "react";
import { useEffect } from "react";

export const OTP = ({ length = 4 }) => {
  const refs = useRef([]);
  const [otps, setOtps] = useState(new Array(length).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otps];
    newOtp[index] = value.substring(value.length - 1);
    setOtps(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
    }

    if (value && index < length - 1 && refs.current[index + 1]) {
      refs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otps[index] &&
      index > 0 &&
      refs.current[index - 1]
    ) {
      refs.current[index - 1].focus();
    }
  };

  const handleClick = (index) => {
    refs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otps[index - 1]) {
      refs.current[otps.indexOf("")].focus();
    }
  };

  useEffect(() => {
    if (refs.current[0]) {
      refs.current[0].focus();
    }
  }, []);

  return (
    <div className="container">
      <p>Enter Your OTP</p>

      <div className="otp_box_container">
        {otps.map((value, index) => {
          return (
            <input
              key={index}
              type="text"
              ref={(input) => (refs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="otp_box"
            />
          );
        })}
      </div>
    </div>
  );
};
