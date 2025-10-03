import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./printWatermark.scss";

const WATERMARK_ENABLED_BY_DEFAULT = true; // Print watermark is enabled by default

export const WatermarkContext = createContext({
  isWatermarkEnabled: WATERMARK_ENABLED_BY_DEFAULT,
  setWatermarkEnabled: () => {}
});

export const WatermarkProvider = ({ children }) => {
  const [isWatermarkEnabled, setWatermarkEnabled] = useState(
    WATERMARK_ENABLED_BY_DEFAULT
  );

  return (
    <WatermarkContext.Provider
      value={{ isWatermarkEnabled, setWatermarkEnabled }}
    >
      {isWatermarkEnabled && <div className={style.watermark} />}
      {children}
    </WatermarkContext.Provider>
  );
};

WatermarkProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const DisablePrintWatermark = () => {
  const { setWatermarkEnabled } = useContext(WatermarkContext);

  useEffect(() => {
    setWatermarkEnabled(false);

    return () => {
      setWatermarkEnabled(true);
    };
  }, []);
  return null;
};
