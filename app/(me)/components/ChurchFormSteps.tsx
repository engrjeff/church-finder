import React from "react";

import ChurchFormStepItem from "./ChurchFormStepItem";

const formSteps = [
  {
    label: "Basic Info",
    step: "basic-info",
  },
  {
    label: "Church Profile",
    step: "church-profile",
  },
  {
    label: "Church Contact Info",
    step: "church-contact-info",
  },
  {
    label: "Pastor's Profile",
    step: "pastor-profile",
  },
  {
    label: "Media",
    step: "media",
  },
  {
    label: "Church Map",
    step: "church-map",
  },
];

function ChurchFormSteps({ steps_completed }: { steps_completed?: string[] }) {
  return (
    <ul className='space-y-2'>
      {formSteps.map((item) => (
        <ChurchFormStepItem
          key={item.label}
          stepItem={item}
          isCompleted={steps_completed?.includes(item.step)}
        />
      ))}
    </ul>
  );
}

export default ChurchFormSteps;
