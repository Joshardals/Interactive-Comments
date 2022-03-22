import React, { useState } from "react";
import tw from "tailwind-styled-components";

const Comment = () => {
  const [vote, setVote] = useState(0);
  const upVote = () => {
    if (vote >= 0) {
      setVote(vote + 1);
    }
  };
  const downVote = () => {
    if (vote > 0) {
      setVote(vote - 1);
    }
  };
  return (
    <Wrapper>
      <Votes>
        <Add onClick={upVote}>+</Add>
        <Value>{vote}</Value>
        <Subtract onClick={downVote}>-</Subtract>
      </Votes>
      <Header>
        <Top>
          <Profile>
            <ProfileImg src="/avatars/image-amyrobson.png" />
            <Username>amyrobson</Username>
            <Time>1 month ago</Time>
          </Profile>
          <ReplyButton>
            <ReplyIcon src="/icon-reply.svg" />
            <Reply>Reply</Reply>
          </ReplyButton>
        </Top>
        <Body>
          Impressive! Though it seems the drag feature could be improved. But
          overall it looks incredible. You've nailed the design and the
          responsiveness at various breakpoints works really well.
        </Body>
      </Header>
    </Wrapper>
  );
};

const Wrapper = tw.div`
    bg-white p-[1rem] h-[14rem] md:h-auto rounded-md
    w-auto flex space-x-4 items-start relative
`;
const Votes = tw.div`
    bg-[#eaecf1] flex md:flex-col
    justify-center px-2 py-1 h-auto rounded-lg
    md:inline-flex absolute md:relative bottom-4
    md:bottom-0 md:w-auto w-[6rem] space-x-5 md:space-x-0
`;
const Add = tw.button`
    text-[#5457b6] opacity-50
`;
const Value = tw.div`
    font-bold text-[#5457b6] text-center
`;
const Subtract = tw.button`
    text-[#5457b6] opacity-50
`;
const Header = tw.div`
   flex flex-col space-y-2
`;
const Top = tw.div`
    flex w-full justify-between
`;
const Body = tw.div`
    text-sm opacity-70
`;
const Profile = tw.div`
    flex items-center space-x-4 
`;
const ProfileImg = tw.img`
    object-contain h-8 w-8
`;
const Username = tw.div`
    font-bold text-sm
`;
const Time = tw.div`
    text-sm opacity-50 font-bold
`;
const ReplyButton = tw.button`
    flex items-center space-x-2 text-sm
    md:inline-flex absolute md:relative 
    right-4 bottom-4 md:bottom-0
`;
const ReplyIcon = tw.img``;
const Reply = tw.div`
    font-bold text-[#5457b6]
`;

export default Comment;
