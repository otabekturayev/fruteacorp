import React, { useState, useEffect, useRef } from 'react';

const CutText = ({text, maxLines, className = ''}) => {
  const [truncatedText, setTruncatedText] = useState(text);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el && el.scrollHeight > el.clientHeight) {
      let end = text.length;
      while (el.scrollHeight > el.clientHeight && end > 0) {
        end--;
        el.innerText = `${text.slice(0, end)}...`;
      }
      setTruncatedText(el.innerText);
    }
  }, [text, maxLines]);

  return (
    <div
      ref={textRef}
      className={`overflow-hidden text-ellipsis leading-4 ${className}`} 
      style={{ WebkitLineClamp: maxLines, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}
    >
      {truncatedText}
    </div>
  );
};

export default CutText;