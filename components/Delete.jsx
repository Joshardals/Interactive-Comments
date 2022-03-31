import React from "react";
import tw from "tailwind-styled-components";
import { replyItem, confirmDelete, deleteItem } from "../atoms/dataAtom";
import { useRecoilState, useRecoilValue } from "recoil";

const Delete = ({ id }) => {
  const [replyContent, setReplyContent] = useRecoilState(replyItem);
  const [confirmDeleted, setConfirmDeleted] = useRecoilState(confirmDelete);
  const [deletedItem, setDeletedItem] = useRecoilState(deleteItem);
  console.log(id);
  const handleDelete = (e) => {
    e.preventDefault();
    let newContent = replyContent.filter((res) => res.id !== id);
    setReplyContent(newContent);
    setDeletedItem(!deletedItem);
  };
  return (
    <Wrapper>
      <Container>
        <Box>
          <h1 className="font-bold text-gray-700 text-lg">Delete comment</h1>
          <p className="text-sm opacity-60">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <Buttons>
            <Cancel>No, Cancel</Cancel>
            <Confirm onClick={handleDelete}>Yes, Delete</Confirm>
          </Buttons>
        </Box>
      </Container>
    </Wrapper>
  );
};
const Wrapper = tw.div`
    fixed top-0 left-0 h-[100vh] w-full bg-black 
    z-10 bg-opacity-40
`;
const Container = tw.div`
    flex items-center justify-center
    min-h-full
`;
const Box = tw.div`
    h-auto w-[20rem] bg-white p-6 rounded-md space-y-4
`;
const Buttons = tw.div`
    flex space-x-4
`;
const Cancel = tw.button`
    text-capitalize flex-1 bg-gray-500
    tex-white p-2 text-white rounded-md
`;
const Confirm = tw.button`
    text-capitalize flex-1 bg-[#ed6468]
    tex-white p-2 text-white rounded-md
`;
export default Delete;
