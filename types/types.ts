import { FileProps } from "@/components/FormInputs/MultipleFileUpload";
import { AppointmentStatus, UserRole } from "@prisma/client";

export type ServiceProps = {
  title: string;
  imageUrl: string;
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
  hospitalWebsite?: string;
  hospitalHoursOfOperation: number;
  servicesOffered: string[];
  insuranceAccepted: string;
  hourlyWage: number;
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

export type stats = {
  doctors: string;
  patients: string;
  appointments: string;
  services: string;
};

export type DoctorProfileAvailability = {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export interface DoctorProfile {
  firstName: string;
  lastName: string;
  gender: string;
  bio: string | null;
  profilePicture: string | null;
  operationMode: string | null;
  hourlyWage: number;
  availability: DoctorProfileAvailability | null;
}

interface DoctorProfileDetail extends DoctorProfile {
  id: string | null;
  yearsOfExperience: number | null;
  country: string | null;
  city: string | null;
  state: string | null;
  primarySpecialization: string | null;
  otherSpecializations: string[] | null;
  hospitalName: string | null;
  hospitalAddress: string | null;
  hospitalContactNumber: string | null;
  hospitalEmailAddress: string | null;
  hospitalWebsite: string | null;
  hospitalHoursOfOperation: number | null;
  servicesOffered: string[] | null;
  insuranceAccepted: string | null;
  languagesSpoken: string[] | null;
  educationHistory: string | null;
  research: string | null;
  accomplishments: string | null;
}

export type Doctor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  slug: string;
  doctorProfile: DoctorProfile | null;
};

export type DoctorDetail = {
  id: string;
  name: string;
  email: string;
  phone: string;
  slug: string;
  doctorProfile: DoctorProfileDetail | null;
};

export interface AppointmentProps {
  appointmentDate: Date | undefined;
  appointmentFormattedDate: string;
  doctorId: string;
  charge: number;
  appointmentTime: string;
  // Patient details
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  email: string;
  dob?: Date;
  location: string;
  appointmentReason: string;
  medicalDocuments: string[];
  occupation: string;
  patientId: string;
  status: AppointmentStatus;
  meetingLink: string;
  meetingProvider: string;
}
