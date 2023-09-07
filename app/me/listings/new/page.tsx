"use client";

import BasicInfoForm from "@/components/forms/basic-info-form";
import { useSearchParams } from "next/navigation";

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
    desc: "Contact numnber, wesbite, email, social links.",
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

function NewListingPage() {
  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step");

  if (!currentStep) return null;

  const currentHeader = headers[currentStep as keyof typeof headers];

  return (
    <>
      <div>
        <h3 className='text-lg font-medium'>{currentHeader.title}</h3>
        <p className='text-sm text-muted-foreground'>{currentHeader.desc}</p>
      </div>
      <div className='py-6'>
        <BasicInfoForm />
      </div>
    </>
  );
}

export default NewListingPage;
