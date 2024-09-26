import  { Document } from 'mongoose';


export interface IClub extends Document {
    firstName: string;
    lastName: string;
    stripeCustomerId: string;
    iban: string;
    bic: string;
    dombank: string;
    clubName: string;
    clubAddress: string;
    clubPhone: string;
    clubEmail: string;
    clubWebsite: string;
    phoneNumber: string;
    sport: string;
    email: string;
    password: string;
    role: string;
    qrCode: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
  }
