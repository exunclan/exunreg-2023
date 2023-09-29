import { getServerSession } from "next-auth/next";
import { authOptions } from "@/util/auth";

import ProfileData from "@/components/ProfileData";

type FormData = {
  email: string;
  name: string;
  phone: string;
  teacher: string;
  teacherEmail: string;
  principal: string;
  address: string;
  ncr: boolean;
};

async function getUser(email: string): Promise<FormData> {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user?email=${email}`,
    {
      next: {
        revalidate: 30,
      },
    }
  ).then((res) => res.json());
  return user;
}

export default async function DashboardProfilePage() {
  const session = await getServerSession(authOptions);
  const user = await getUser(session?.user?.email);

  return (
    <>
      <ProfileData values={user as FormData} />
    </>
  );
}
