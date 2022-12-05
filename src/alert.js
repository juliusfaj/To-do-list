import React, { useEffect } from "react";

function Alert({ statue, message, style, handleAlert, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleAlert();
    }, 3000);

    return () => {
      clearInterval(timeout);
    };
  }, [list]);

  return <p className={`alert alert-${style}`}>{message}</p>;
}

export default Alert;
