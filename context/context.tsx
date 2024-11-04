// context.tsx
"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import {
  AdditionalFormProps,
  BioDataFormProps,
  ContactFormProps,
  EducationFormProps,
  HospitalFormProps,
  ProfileFormProps,
} from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface IOnBoardingContextData {
  trackingNumber: string;
  setTrackingNumber: (trackingNumber: string) => void;
  doctorProfileId: string;
  setDoctorProfileId: (doctorProfileId: string) => void;

  // Track the form data
  bioData: BioDataFormProps;
  profileData: ProfileFormProps;
  contactData: ContactFormProps;
  educationData: EducationFormProps;
  hospitalData: HospitalFormProps;
  additionalData: AdditionalFormProps;

  savedDBData: any;
  setSavedDBData: (data: any) => void;

  setBioData: (data: BioDataFormProps) => void;
  setProfileData: (data: ProfileFormProps) => void;
  setContactData: (data: ContactFormProps) => void;
  setEducationData: (data: EducationFormProps) => void;
  setHospitalData: (data: HospitalFormProps) => void;
  setAdditionalData: (data: AdditionalFormProps) => void;
}

const initialBioData: BioDataFormProps = {
  firstName: "",
  lastName: "",
  rut: "",
  dob: null,
  gender: "",
  page: "",
  userId: "",
  trackingNumber: "",
};

const initialProfileData: ProfileFormProps = {
  profilePicture: "",
  bio: "",
  page: "",
  medicalLicense: "",
  medicalLicenseExpiry: null,
  yearsOfExperience: 0,
};

const initialContactData: ContactFormProps = {
  email: "",
  phone: "",
  country: "",
  city: "",
  state: "",
  page: "",
};

const initialEducationData: EducationFormProps = {
  medicalSchool: "",
  graduationYear: 0,
  primarySpecialization: "",
  otherSpecializations: [],
  boardCertifications: [],
  page: "",
};

const initialHospitalData: HospitalFormProps = {
  hospitalName: "",
  hospitalAddress: "",
  hospitalContactNumber: "",
  hospitalEmailAddress: "",
  hospitalWebsite: "",
  hospitalHoursOfOperation: 0,
  servicesOffered: [],
  insuranceAccepted: "",
  languagesSpoken: [],
  hourlyWage: 100,
  page: "",
};

const initialAdditionalData: AdditionalFormProps = {
  educationHistory: "",
  research: "",
  accomplishments: "",
  additionalDocs: [],
  page: "",
};

const OnBoardingContext = createContext<IOnBoardingContextData | undefined>(
  undefined
);

export function OnboardingContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } = useSession();

  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [doctorProfileId, setDoctorProfileId] = useState<string>("");
  const [bioData, setBioData] = useState<BioDataFormProps>(initialBioData);
  const [profileData, setProfileData] =
    useState<ProfileFormProps>(initialProfileData);
  const [contactData, setContactData] =
    useState<ContactFormProps>(initialContactData);
  const [educationData, setEducationData] =
    useState<EducationFormProps>(initialEducationData);
  const [hospitalData, setHospitalData] =
    useState<HospitalFormProps>(initialHospitalData);
  const [additionalData, setAdditionalData] = useState<AdditionalFormProps>(
    initialAdditionalData
  );

  const [savedDBData, setSavedDBData] = useState<any>({});

  function resetContext() {
    setTrackingNumber("");
    setDoctorProfileId("");
    setBioData(initialBioData);
    setProfileData(initialProfileData);
    setContactData(initialContactData);
    setEducationData(initialEducationData);
    setHospitalData(initialHospitalData);
    setAdditionalData(initialAdditionalData);
    setSavedDBData({});
  }
  useEffect(() => {
    resetContext();
  }, [session?.user?.id]);

  const contextValues = {
    trackingNumber,
    setTrackingNumber,
    doctorProfileId,
    setDoctorProfileId,
    bioData,
    setBioData,
    profileData,
    setProfileData,
    contactData,
    setContactData,
    educationData,
    setEducationData,
    hospitalData,
    setHospitalData,
    additionalData,
    setAdditionalData,
    savedDBData,
    setSavedDBData,
  };

  return (
    <OnBoardingContext.Provider value={contextValues}>
      {children}
    </OnBoardingContext.Provider>
  );
}

export function useOnBoardingContext() {
  const context = useContext(OnBoardingContext);
  if (!context) {
    throw new Error(
      "useOnBoardingContext must be used within an OnboardingContextProvider"
    );
  }
  return context;
}
