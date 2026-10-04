import { useState, useEffect } from "react";

function App() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const inputNumber = (number) => {
    if (waitingForSecondNumber) {
      setDisplay(number);
      setWaitingForSecondNumber(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondNumber) {
      setDisplay("0.");
      setWaitingForSecondNumber(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const chooseOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstNumber === null) {
      setFirstNumber(inputValue);
    }

    setOperator(nextOperator);
    setWaitingForSecondNumber(true);
  };

  const calculate = () => {
    if (firstNumber === null || operator === null) return;

    const secondNumber = parseFloat(display);
    let result;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;

      case "-":
        result = firstNumber - secondNumber;
        break;

      case "×":
        result = firstNumber * secondNumber;
        break;

      case "÷":
        if (secondNumber === 0) {
          setDisplay("Error");
          setFirstNumber(null);
          setOperator(null);
          setWaitingForSecondNumber(true);
          return;
        }
        result = firstNumber / secondNumber;
        break;

      default:
        return;
    }

    setDisplay(String(Number(result.toFixed(10))));
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(true);
  };

  const clearCalculator = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  const handleButton = (value) => {
    if (value >= "0" && value <= "9") {
      inputNumber(value);
    } else if (value === ".") {
      inputDecimal();
    } else if (value === "=") {
      calculate();
    } else if (value === "C") {
      clearCalculator();
    } else {
      chooseOperator(value);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (key >= "0" && key <= "9") {
        inputNumber(key);
      } else if (key === ".") {
        inputDecimal();
      } else if (key === "+") {
        chooseOperator("+");
      } else if (key === "-") {
        chooseOperator("-");
      } else if (key === "*") {
        chooseOperator("×");
      } else if (key === "/") {
        event.preventDefault();
        chooseOperator("÷");
      } else if (key === "Enter" || key === "=") {
        calculate();
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        clearCalculator();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const buttons = [
    "C",
    "÷",
    "×",
    "-",
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    ".",
    "1",
    "2",
    "3",
    "=",
    "0",
  ];

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-700">
            CvSU Calculator
          </h1>

          <p className="text-gray-600 mt-2">
            React + Tailwind CSS Calculator Project
          </p>
        </div>

        <div className="bg-gray-900 rounded-3xl p-5 shadow-2xl">
          <div className="bg-gray-800 rounded-2xl p-5 mb-5">
            <div className="text-right text-white text-4xl font-semibold break-all">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {buttons.map((button) => {
              const isOperator =
                ["÷", "×", "-", "+"].includes(button);

              const isEquals = button === "=";
              const isClear = button === "C";

              let buttonStyle =
                "bg-gray-700 hover:bg-gray-600 text-white";

              if (isOperator) {
                buttonStyle =
                  "bg-orange-500 hover:bg-orange-400 text-white";
              }

              if (isEquals) {
                buttonStyle =
                  "bg-green-600 hover:bg-green-500 text-white";
              }

              if (isClear) {
                buttonStyle =
                  "bg-red-600 hover:bg-red-500 text-white";
              }

              return (
                <button
                  key={button}
                  onClick={() => handleButton(button)}
                  className={`
                    ${buttonStyle}
                    h-16 rounded-2xl
                    text-2xl font-bold
                    transition
                    duration-150
                    active:scale-95
                  `}
                >
                  {button}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-green-700 mb-3">
            User Guide
          </h2>

          <p className="text-gray-600 mb-4">
            Use the calculator buttons to enter numbers and perform
            mathematical operations.
          </p>

          <h3 className="font-bold text-gray-900">
            How to Use
          </h3>

          <ol className="list-decimal list-inside text-gray-600 mt-2 space-y-1">
            <li>Enter the first number.</li>
            <li>Select an operation.</li>
            <li>Enter the second number.</li>
            <li>Press = to calculate the result.</li>
            <li>Press C to clear the calculator.</li>
          </ol>

          <h3 className="font-bold text-gray-900 mt-5">
            Supported Operations
          </h3>

          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Addition (+)</li>
            <li>Subtraction (-)</li>
            <li>Multiplication (×)</li>
            <li>Division (÷)</li>
            <li>Decimal Numbers</li>
          </ul>

          <h3 className="font-bold text-gray-900 mt-5">
            Keyboard Support
          </h3>

          <p className="text-gray-600 mt-2">
            Use your keyboard for faster input. Press Enter to
            calculate and Escape to clear.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-green-700 mb-2">
            CvSU Vision
          </h2>

          <p className="text-gray-600 text-sm">
            The premier university in historic Cavite globally
            recognized for excellence in character development,
            academics, research, innovation and sustainable
            community engagement.
          </p>

          <h2 className="text-xl font-bold text-green-700 mt-4 mb-2">
            CvSU Mission
          </h2>

          <p className="text-gray-600 text-sm">
            Cavite State University shall provide excellent,
            equitable, and relevant educational opportunities in
            the arts, sciences, and technology through quality
            instruction and responsive research and development
            activities. It shall produce professional, skilled,
            and morally upright individuals for global
            competitiveness.
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mt-6">
          <p>DCIT 26: Application Development and Emerging Technologies</p>
          <p className="mt-1">Laboratory 1 - Calculator Project</p>
        </div>
      </div>
    </div>
  );
}

export default App;