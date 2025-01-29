import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function Form() {
  const { myTheme, setMyTheme } = useContext(ThemeContext);
const handleClick = () => {
  setMyTheme(myTheme === "light" ? "dark" : "light");

  //yrasome i local storage
  localStorage.setItem("myTheme", myTheme==='light' ? 'dark' : 'light');
}

  return (
    <div className="bg-red-400 dark:bg-gray-900 dark:text-pink-400">
      <div className="p-4 flex flex-col gap-4 max-w-lg">
        <h1>Form</h1>
        <input
          type="text"
          placeholder="Enter your name"
          className="block border p-2"
        />
        <input
          type="email"
          placeholder="Enter your email"
          className="block border p-2"
        />
        <button className="block bg-white p-1">Submit</button>
        <button onClick={handleClick} className="block bg-white p-1">Change colors</button>
      </div>
    </div>
  );
}

export default Form;
