// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { FaGithub } from "react-icons/fa";

//@ts-ignore
import useCurrencyInfo from "./hooks/useCurrencyInfo.js";
import Input from "./components/InputBox.js";
import { useEffect, useState } from "react";
function App() {
  // useEffect(() => {
  //   setYear(new Date().getFullYear());
  // }, []);
  // const [year, setYear] = useState(new Date().getFullYear());
  const [amount, setAmount] = useState<number | string>("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  
  const currencyInfo = useCurrencyInfo(from);
  useEffect(() => {
    if (amount == 0) {
      setAmount("")
    }
  },[amount])
  
  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount as number);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (amount === 0) {
      setConvertedAmount(0);
    } else {
      setConvertedAmount((amount as number) * currencyInfo[to]);
    }
  };

  const options = Object.keys(currencyInfo);
  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="fixed top-2 right-2 z-10">
          <a href="https://github.com/BhaveshP888/currency-coverter">
            <FaGithub className="text-2xl text-white" />
          </a>
        </div>
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <Input
                  label={"From"}
                  currCurrency={from}
                  amount={amount}
                  onAmountChange={(amount) => setAmount(amount)}
                  onCurrencyChange={(currency) => {
                    setFrom(currency);
                    console.log(currency);
                    setAmount(amount);
                  }}
                  currencyOptions={options}
                  selectCurrency={from}
                  className={""}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 translate-x-1/2 -translate-y-1/2 border-2 border-grey rounded-lg bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <Input
                  label={"To"}
                  currCurrency={to}
                  amount={
                    typeof convertedAmount === "number"
                      ? convertedAmount.toFixed(2)
                      : amount
                  }
                  onAmountChange={(amount) => setAmount(amount)}
                  onCurrencyChange={(currency) => {
                    console.log(currency);
                    setTo(currency);
                  }}
                  currencyOptions={options}
                  selectCurrency={from}
                  className={""}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
        {/* <footer className=" p-2 backdrop:blur-sm bg-white/20 absolute bottom-2 w-1/1 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-2xl border border-gray-300">
          <p className="text-white text-lg text-bold text-center">
            Copyright @{year} BhaveshP
          </p>
        </footer> */}
      </div>
    </>
  );
}

export default App;
