import { useId } from "react";

interface inputProps {
  label: string;
  currCurrency: string;
  amount: number | string;
  onAmountChange: (amount: number) => void;
  onCurrencyChange: (currency: string) => void;
  currencyOptions: string[];
  selectCurrency?: string;
  amountDisable?: boolean;
  currencyDisable?: boolean;
  className: string;
}

export default function InputBox({
  label,
  currCurrency,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions,
  // selectCurrency,
  amountDisable = false,
  currencyDisable = false,
  className = "",
}: inputProps) {
  const amountInputId = useId();
  return (
    <div className={`bg-white p-3 rounded-lg text-sm ${className}`}>
      <div className="w-1/2">
        <label htmlFor="">{label}</label>
        <input
          id={amountInputId}
          type="number"
          placeholder="Amount"
          value={amount}
          disabled={amountDisable}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          className="outline-none w-full bg-transparent py-1.5"
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full"></p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={currCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
