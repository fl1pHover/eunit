import { Image } from '@chakra-ui/react';
import { useRef } from 'react';

const ProfileImage = ({ selectedImage, setSelectedImage, user }) => {
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert(URL.createObjectURL(selectedImage));
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <div className="">
      <input
        type="file"
        className="form-control"
        onChange={imageChange}
        accept="image/*"
        style={{ display: 'none' }}
        ref={hiddenFileInput}
      />

      {selectedImage ? (
        <div className="h-[25vh] relative rounded-md flex-col justify-center items-center ">
          <Image
            src={
              URL.createObjectURL(selectedImage) ??
              URL.createObjectURL(user?.profileImg)
            }
            className="object-cover object-center w-full h-full overflow-hidden bg-gray-300 rounded-md aspect-square"
            alt="Thumb"
          />
          <div className="flex justify-between w-full">
            <p
              onClick={handleClick}
              className="float-right font-bold text-gray-500 cursor-pointer"
            >
              Зураг солих
            </p>
            <p
              onClick={removeSelectedImage}
              className="float-right font-bold text-red-400 cursor-pointer"
            >
              Усгтах
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="border-2 w-full h-[25vh]  border-dotted border-blue-400 bg-blue-100/50 rounded-xl mx-auto aspect-square outline-none p-4 flex flex-col justify-center items-center"
        >
          <p>Зураг оруулах</p>
        </button>
      )}
    </div>
  );
};

export default ProfileImage;
