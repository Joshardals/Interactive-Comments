import React from "react";
import { useSession } from "next-auth/react";
import tw from "tailwind-styled-components";

const Profile = () => {
  return (
    <Wrapper>
      <Container>
        <ProfileImg src="/avatars/image-juliusomo.png" />
        <Username>Welcome, Joshua</Username>
      </Container>
    </Wrapper>
  );
};
const Wrapper = tw.div`
    flex items-center justify-end m-4
`;
const Container = tw.button`
    bg-gray-200 flex items-center rounded-full
    space-x-4 p-2
`;
const Username = tw.div``;
const ProfileImg = tw.img`
    object-contain h-8 w-8 rounded-full
`;
export default Profile;
