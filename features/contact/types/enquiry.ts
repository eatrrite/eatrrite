/** One contact-form enquiry, already checked by validateEnquiry. */
export type EnquiryInput = {
  name: string;
  /** Empty when not given: the email field is optional. */
  email: string;
  /** 10 digits, no country code. */
  phone: string;
  /** Empty when not given. */
  city: string;
  program: string;
  /** Empty when not given. */
  message: string;
};
