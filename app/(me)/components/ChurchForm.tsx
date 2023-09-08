"use client";

import React from "react";

import ChurchFormStepHeader from "./ChurchFormStepHeader";
import useCurrentFormStep from "@/lib/hooks/useCurrentFormStep";
import RenderIf from "@/components/RenderIf";

import BasicInfoForm from "./BasicInfoForm";
import ChurchProfileForm from "./ChurchProfileForm";
import ChurchContactForm from "./ChurchContactForm";
import PastorProfileForm from "./PastorProfileForm";
import MediaForm from "./MediaForm";

function ChurchForm() {
  const currentStep = useCurrentFormStep();

  return (
    <div className='flex-1 pb-6 max-w-5xl container'>
      <ChurchFormStepHeader />
      <RenderIf condition={currentStep === "basic-info"}>
        <BasicInfoForm />
      </RenderIf>
      <RenderIf condition={currentStep === "church-profile"}>
        <ChurchProfileForm />
      </RenderIf>
      <RenderIf condition={currentStep === "church-contact-info"}>
        <ChurchContactForm />
      </RenderIf>
      <RenderIf condition={currentStep === "pastor-profile"}>
        <PastorProfileForm />
      </RenderIf>
      <RenderIf condition={currentStep === "media"}>
        <MediaForm />
      </RenderIf>
    </div>
  );
}

export default ChurchForm;
