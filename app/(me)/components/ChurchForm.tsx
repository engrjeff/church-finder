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

import { type ChurchFormData } from "@/app/services/church";
import {
  ChurchContactData,
  PastorProfileData,
  type ChurchProfileData,
} from "@/lib/schema/church";

function getBasicInfoData(churchData: ChurchFormData) {
  if (!churchData || !churchData.basicInfo) return undefined;

  const {
    id,
    user_id,
    createdAt,
    updatedAt,
    status,
    steps_completed,
    ...formValues
  } = churchData.basicInfo;

  return formValues;
}

function getChurchProfileData(
  churchData: ChurchFormData
): ChurchProfileData | undefined {
  if (!churchData || !churchData.profile) return undefined;

  const { id, createdAt, updatedAt, ...profile } = churchData.profile;

  return {
    ...profile,
    services: profile.services as ChurchProfileData["services"],
    ministries: profile.ministries as ChurchProfileData["ministries"],
    public_services:
      profile.public_services as ChurchProfileData["public_services"],
    confessions: profile.confessions as ChurchProfileData["confessions"],
  };
}

function getChurchContactData(
  churchData: ChurchFormData
): ChurchContactData | undefined {
  if (!churchData || !churchData.contact_details) return undefined;

  const { id, createdAt, church_id, updatedAt, ...contact } =
    churchData.contact_details;

  return {
    ...contact,
    contact_numbers:
      contact.contact_numbers as ChurchContactData["contact_numbers"],
    social_links: contact.social_links as ChurchContactData["social_links"],
  };
}

function getPastorData(
  churchData: ChurchFormData
): PastorProfileData | undefined {
  if (!churchData || !churchData.pastor_details) return undefined;

  const { id, createdAt, church_id, updatedAt, ...pastor } =
    churchData.pastor_details;

  return {
    photo: pastor.photo!,
    name: pastor.name,
    bio: pastor.bio!,
  };
}

function ChurchForm({ churchData }: { churchData?: ChurchFormData }) {
  const currentStep = useCurrentFormStep();

  return (
    <div className='flex-1 pb-6 max-w-5xl container'>
      <ChurchFormStepHeader />
      <RenderIf condition={currentStep === "basic-info"}>
        <BasicInfoForm basicInfoData={getBasicInfoData(churchData)} />
      </RenderIf>
      <RenderIf condition={currentStep === "church-profile"}>
        <ChurchProfileForm
          churchProfileId={churchData?.profile?.id}
          churchProfileData={getChurchProfileData(churchData)}
        />
      </RenderIf>
      <RenderIf condition={currentStep === "church-contact-info"}>
        <ChurchContactForm
          churchContactId={churchData?.contact_details?.id}
          churchContactData={getChurchContactData(churchData)}
        />
      </RenderIf>
      <RenderIf condition={currentStep === "pastor-profile"}>
        <PastorProfileForm
          pastorProfileId={churchData?.pastor_details?.id}
          pastorData={getPastorData(churchData)}
        />
      </RenderIf>
      <RenderIf condition={currentStep === "media"}>
        <MediaForm />
      </RenderIf>
    </div>
  );
}

export default ChurchForm;
