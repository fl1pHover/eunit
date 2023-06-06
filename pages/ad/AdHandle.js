import React from "react";

const AdHandle = () => {
  return (
    <>
      <IconButton
        className="float-right bg-white border-2 border-gray-200"
        aria-label="Bookmark add"
        icon={<FaHeart />}
        _hover={{
          color: "red",
        }}
        size={{ base: "xs", sm: "md" }}
        color={
          bookmarks?.find((b) => b == data._id) != undefined ? "red" : "gray"
        }
        onClick={() => {
          if (bookmarks != undefined) {
            dispatch(setBookmark(data._id));
            if (bookmarks.includes(data._id)) {
              toast({
                title: "Зар хүслээс хасагдлаа.",
                status: "warning",
                duration: 5000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Зар хүсэлд нэмэгдлээ.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            }
          } else {
            toast({
              title: "Та нэвтэрнэ үү",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
          }
        }}
      />
      <IconButton
        className="float-right bg-white border-2 border-gray-200 hover:text-blue-600"
        aria-label="Get link"
        icon={<FaCopy />}
        onClick={() => {
          copyToClipboard(),
            toast({
              title: `Холбоосыг хуулж авлаа`,
              status: "info",
              isClosable: true,
              duration: 1500,
            });
        }}
        size={{ base: "xs", sm: "md" }}
      />
    </>
  );
};

export default AdHandle;
