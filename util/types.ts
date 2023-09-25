import { ObjectId } from "mongodb";

export type TeamMember = {
  _id: ObjectId;
  name: string;
  class: string;
  email: string;
  phone: string;
  role?: string;
};

export type Teams = {
  [key: string]: TeamMember[];
};

export type User = {
  _id: ObjectId;
  password: string;
  teams: Teams;
  emailVerified: boolean;
  teacherEmailVerified: boolean;
  email: string;
  name: string;
  phone: string;
  teacher: string;
  teacherEmail: string;
  principal: string;
  address: string;
  ncr: boolean;
};
