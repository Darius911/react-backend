import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";

function Form() {
  const contextValue = useContext(ThemeContext);
  // console.log(contextValue);
  const { myTheme, setMyTheme } = contextValue;

  const handleClick = () => {
    setMyTheme(myTheme === "light" ? "dark" : "light");
    localStorage.setItem("myTheme", myTheme === "light" ? "dark" : "light");
  };

  return (
    <div className="bg-red-400 dark:bg-gray-800 dark:text-pink-400" >
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
        <button className="block bg-white p-1" onClick={handleClick}>
          Change colors
        </button>
      </div>
    </div>
  );
}

export default Form;
