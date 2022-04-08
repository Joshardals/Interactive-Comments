import React from "react";
import { useSession, signOut } from "next-auth/react";
import tw from "tailwind-styled-components";

const Profile = () => {
  const { data: session } = useSession();
  return (
    <Wrapper>
      <Container onClick={() => signOut()}>
        <ProfileImg src={session?.user?.image} />
        <Username>{session?.user?.name}</Username>
      </Container>
    </Wrapper>
  );
};
const Wrapper = tw.div`
    flex items-center justify-end m-4
`;
const Container = tw.button`
    flex items-center rounded-full
    space-x-4 p-1 md:p-2 hover:bg-gray-300 transition-all ease-in
`;
const Username = tw.div`
    md:inline-flex hidden
`;
const ProfileImg = tw.img`
    object-contain h-8 w-8 rounded-full
`;
export default Profile;
