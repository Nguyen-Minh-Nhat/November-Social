import { useEffect, useRef, useState } from "react";
const TextArea = ({
  onPaste,
  onChange,
  value,
  className,
  autoFocus,
  onEnter,
}) => {
  const [val, setVal] = useState(value);
  const textAreaRef = useRef(null);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  useEffect(resizeTextArea, [val]);

  const handleChange = (e) => {
    setVal(e.target.value);
    onChange(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && onEnter) {
      e.preventDefault();
      setVal("");
      onEnter();
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      className={`resize-none overflow-hidden w-full outline-none bg-transparent dark:text-dark-text-regular ${className}`}
      value={val}
      rows={1}
      placeholder={"Write something..."}
      onChange={handleChange}
      onPaste={onPaste}
      autoFocus={autoFocus}
      onKeyDown={handleEnter}
      onFocus={(e) => {
        var val = e.target.value;
        e.target.value = "";
        e.target.value = val;
      }}
    />
  );
};

export default TextArea;
