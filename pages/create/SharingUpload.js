import { AtomLabel } from "@/components/createAd/step3/atom";
import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { MdPictureAsPdf } from "react-icons/md";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Import the styles

const SharingUpload = ({
  label,
  onChange,
  generalData = {},
  setImages = () => {},
  images = [],
}) => {
  // const hiddenFileInput = React.useRef(null);

  // const handleClick = (event) => {
  //   hiddenFileInput.current.click();
  // };

  // function deleteHandler(image) {
  //   // IF ALL IMAGES ARE GONE, SETTING STATUS FALSE
  //   if (selectedImages?.length === 1) {
  //     setGeneralData((prev) => ({ ...prev, imgSelected: false }));
  //     setIsImageSelected(false);
  //   }
  //   setSelectedImages(selectedImages.filter((e) => e !== image));
  //   if (images) setImages(images.filter((e) => e !== image));
  //   setGeneralData((prev) => ({
  //     ...prev,
  //     imgSelected: true,
  //     images: selectedImages.filter((e) => e !== image),
  //   }));

  //   URL.revokeObjectURL(image);
  // }
  console.log(generalData);

  // const [pdfFile, setPdfFile] = useState(null);
  // const [viewPdf, setViewPdf] = useState(null);

  // const fileType = ["application/pdf"];
  // const handleChange = (e) => {
  //   let selectedFile = e.target.files[0];
  //   if (selectedFile) {
  //     if (selectedFile && fileType.includes(selectedFile.type)) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(selectedFile);
  //       reader.onload = (e) => {
  //         setPdfFile(e.target.result);
  //       };
  //     } else {
  //       setPdfFile(null);
  //     }
  //   } else {
  //     console.log("pls select");
  //   }
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (pdfFile !== null) {
  //     setViewPdf(pdfFile);
  //   } else {
  //     setViewPdf(null);
  //   }
  // };
  // const newplugin = defaultLayoutPlugin();

  return (
    <div className="">
      <AtomLabel>{label ? label : "PDF зураг оруулах"}</AtomLabel>

      <form action="">
        <input
          type="file"
          name="upload"
          accept="application/pdf"
          // ref={hiddenFileInput}
          // style={{ display: "none" }}
          onChange={onChange}
        />
      </form>

      {generalData.length > 0 ? (
        <div className="grid w-full h-full grid-cols-2 gap-4 p-4 overflow-hidden border-2 border-blue-400 border-dotted outline-none md:grid-cols-3 bg-blue-100/50 rounded-xl">
          <div className="h-[10vh] relative rounded-md flex justify-center items-center">
            <p>{generalData[0]?.name}</p>
            {/* <button
              onClick={() => deleteHandler(image)}
              className="absolute text-white transition-all bg-gray-500 rounded-full -bottom-2 -right-2 hover:bg-red-500"
            >
              <BiX size={30} />
            </button> */}
          </div>
        </div>
      ) : (
        <button
          onClick={() => {}}
          className="border-2 w-full min-h-[40vh] h-full border-dotted border-blue-400 bg-blue-100/50 rounded-xl outline-none p-4 flex flex-col justify-center items-center"
        >
          <MdPictureAsPdf size={90} className="text-blue-400" />
          <p>Зураг оруулах</p>
        </button>
      )}
      {/* <form className="form-group" onSubmit={handleSubmit}>
          <input type="file" className="form-control" onChange={handleChange} />

          <button type="submit" className="btn btn-success btn-lg">
            UPLOAD
          </button>
        </form>
        <br></br>
        <h4>View PDF</h4>
        <div className="pdf-container">
          <Worker workerUrl="https://unpkg.com/@react-pdf-viewer/pdfjs-dist-signature@2.5.207/build/pdf.worker.min.js">
            {viewPdf && (
              <>
                <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
              </>
            )}
            {!viewPdf && <>No pdf file selected</>}
          </Worker>
        </div> */}
    </div>
  );
};

export default SharingUpload;
