import React, { useContext } from "react";
import RadioComponent from "./RadioComponent";
import { slots } from "../utils/ControlledData";
import BsContext from "../Context/BsContext";

const TimeSchedule = () => {
  const context = useContext(BsContext);

  // Getting time and change changeTime components from the context.
  const { time, changeTime } = context;

  const handleChangeTime = (value) => {
    changeTime(value);

    //setting slot in localstorage
    window.localStorage.setItem("slot", value);
  };

  return (
    <>
      <div className="Slot_container">
        <h1 className="TS_heading">Select a Schedule :-</h1>
        <div className="TS_main_container">
          {slots.map((el, index) => {
            return (
              <RadioComponent
                text={el}
                changeSelection={handleChangeTime}
                data={time}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TimeSchedule;