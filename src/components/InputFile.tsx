import { useCallback, useState } from "react";

import "./InputFile.scss";

const InputFile = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [countDifferentChars, setCountDifferentChars] = useState(0);
  const [uniqueCharacters, setUniqueCharacters] = useState<
    { key: string; count: number }[]
  >([]);

  const validateExtension = useCallback((fileUpload: string) => {
    var allowedFiles = [".txt"];
    var regex = new RegExp(
      "([a-zA-Z0-9s_\\.-:])+(" + allowedFiles.join("|") + ")$"
    );
    if (!regex.test(fileUpload.toLowerCase())) {
      setError("Please upload files having extensions: .txt only");
      return false;
    }
    setError("");
    return true;
  }, []);

  const countTotalCharacter = (str: string) => {
    let newArrStr = str.split(" ");
    const uniqueCount = new Set(newArrStr).size;
    if (uniqueCount < 3) return uniqueCount;

    const uniqueCount2: any = {};
    for (const element of newArrStr) {
      if (uniqueCount2[element]) {
        uniqueCount2[element] += 1;
      } else {
        uniqueCount2[element] = 1;
      }
    }

    const convertUniqueCount2 = Object.keys(uniqueCount2)
      .map((key) => ({
        key: key,
        count: uniqueCount2[key],
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
    console.log(convertUniqueCount2);
    setUniqueCharacters(convertUniqueCount2);
    setCountDifferentChars(uniqueCount);
    return uniqueCount;
  };

  const hasNumber = (str: string) => {
    return /\d/.test(str);
  };

  const hasSpecialChars = (str: string) => {
    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;
    return specialChars.test(str);
  };

  const validateFileContent = useCallback((str: string) => {
    let formatString = str
      .replaceAll(",", " ")
      .replaceAll(".", " ")
      .replaceAll("\n", " ")
      .trim();
    while (formatString.includes("  ")) {
      formatString = formatString.replaceAll("  ", " ");
    }

    if (countTotalCharacter(formatString) < 3) return false;

    return true;
  }, []);

  const validateFile = useCallback(
    (content: string) => {
      if (hasNumber(content)) {
        setError("This file contains number, please choose a valid file");
        return false;
      }
      if (hasSpecialChars(content)) {
        setError(
          "This file contains special character, please choose a valid file"
        );
        return false;
      }
      if (!validateFileContent(content)) {
        setError(
          "This file has less than 3 different characters, please choose a valid file"
        );
        return false;
      }
      setError("");
      return true;
    },
    [validateFileContent]
  );

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    if (!validateExtension(value)) return;
    setFile(value);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result;
      if (!validateFile((text as string).toLowerCase())) {
        setText("");
        return;
      }
      setText(text as string);
    };

    if (e.target?.files && e.target?.files[0]) {
      reader.readAsText(e.target.files[0]);
    }
  };
  return (
    <div className="InputFile">
      <input
        className="App-inputFile"
        draggable
        type="file"
        value={file}
        onChange={handleUploadFile}
      />

      {text && (
        <div className="boxText">
          <p>{text}</p>
          <p>Total different characters: {countDifferentChars}</p>
          <span>The 3 most repeated words:</span>
          <ul>
            {uniqueCharacters.map((character) => (
              <li key={character.key}>
                "{character.key}": {character.count}
              </li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default InputFile;
