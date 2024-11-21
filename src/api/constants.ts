import { NameOfDrugsServiceHook } from "../master-data-service/services/name-of-drugs/service-hook/name-of-drugs-service-hook";
import { RegistrationCertificateServiceHook } from "../master-data-service/services/registration-certificates/service-hook/registration-certificate-service-hook";
import { FakeNameOfDrugsServiceHook } from "./fake-api/name-of-drugs-service-hook";
import { FakeRegistrationCertificateServiceHook } from "./fake-api/registration-certificate-service-hook";

const developmentMode = true;

export const LOCAL_BASE_URL = 'http://localhost';
export const EXTERNAL_URL = 'http://192.168.0.100:8000/api/v1';

export const BASE_URL = developmentMode ? LOCAL_BASE_URL : EXTERNAL_URL;

export const ServiceName = {
  registrationCrtificates: 'registration_certificates',
  nameOfDrugs: 'name_of_drugs',
}

export const ServicesApi = {
  registrationCertificates: developmentMode ? new FakeRegistrationCertificateServiceHook(`${LOCAL_BASE_URL}:3124`) : new RegistrationCertificateServiceHook(),
  nameOfDrugs: developmentMode ? new FakeNameOfDrugsServiceHook(`${LOCAL_BASE_URL}:3125`) : new NameOfDrugsServiceHook(),
}

