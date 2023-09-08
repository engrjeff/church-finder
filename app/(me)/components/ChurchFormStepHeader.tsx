"use client";

import React from "react";
import useCurrentFormStep from "@/lib/hooks/useCurrentFormStep";

const headers = {
  "basic-info": {
    title: "Basic Info",
    desc: "This is where you add your church's basic info",
  },
  "church-profile": {
    title: "Church Profile",
    desc: "Church service times, ministries, confessions, etc.",
  },
  "church-contact-info": {
    title: "Church Contact",
    desc: "Contact number, website, email, social links.",
  },
  "pastor-profile": {
    title: "Pastor's Profile",
    desc: "Pastor's simple bio.",
  },
  media: {
    title: "Media",
    desc: "Church's media gallery, video teaser.",
  },
  "church-map": {
    title: "Church Map",
    desc: "Pin your church's location in a map.",
  },
};

function ChurchFormStepHeader() {
  const currentStep = useCurrentFormStep();

  if (!currentStep) return null;

  const currentHeader = headers[currentStep as keyof typeof headers];

  return (
    <div className='border-b pb-4 mb-4'>
      <h3 className='text-lg font-medium'>{currentHeader.title}</h3>
      <p className='text-sm text-muted-foreground'>{currentHeader.desc}</p>
    </div>
  );
}

export default ChurchFormStepHeader;
