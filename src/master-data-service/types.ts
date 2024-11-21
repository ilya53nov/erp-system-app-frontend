export type ProductTitleType = {
  id: string,
  titleRu: string,
  titleEn: string,
}

export type RegistrationCertificatesFrontendType = {
  id?: string,
  tradeName: string,
  regCertNumber: string,
  createAtRegCer: string,
}

export type RegistrationCertificatesBackendType = {
  id?: string,
  trade_Name: string,
  reg_Cert_Number: string,
  createAt_Reg_Cer: string,
}


export type NameOfDrugsFrontendType = {
  id?: string,
  titleRu: string,
  titleEn: string,
}

export type NameOfDrugsBackendType = {
  id?: string,
  title_ru: string,
  title_en: string,
}