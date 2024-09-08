import { File } from "@/components/FormInputs/MultipleFileUpload";
import { UserRole } from "@prisma/client";

export type ServiceProps = {
  title: string;
  image: string;
  slug: string;
};

export type RegisterInputProps = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: any;
  plan: any;
};

export type LoginInputProps = {
  email: string;
  password: string;
};

export type BioDataFormProps = {
  firstName: string;
  lastName: string;
  rut: string;
  dob: any;
  gender: string;
  page: string;
  userId: string;
  trackingNumber: string;
};

export type ProfileFormProps = {
  profilePicture: string;
  bio: string;
  page: string;
  medicalLicense: string;
  medicalLicenseExpiry: any;
  yearsOfExperience: number;
};

export type ContactFormProps = {
  email: string;
  phone: string;
  country: string;
  city: string;
  state: string;
  page: string;
};

export type EducationFormProps = {
  medicalSchool: string;
  graduationYear: number;
  primarySpecialization: string;
  otherSpecializations: string[];
  boardCertifications: any;
  page: string;
};

export type HospitalFormProps = {
  hospitalName: string;
  hospitalAddress: string;
  hospitalContactNumber: string;
  hospitalEmailAddress: string;
  hospitalWebsite: string;
  hospitalHoursOfOperation: number;
  servicesOffered: string[];
  insuranceAccepted: string;
  languagesSpoken: string[];
  page: string;
};

export type AdditionalFormProps = {
  educationHistory: string;
  research: string;
  accomplishments: string;
  additionalDocs: any;
  page: string;
};
