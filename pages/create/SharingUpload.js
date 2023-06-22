import { AtomLabel } from "@/components/createAd/step3/atom";
import { Image, Link } from "@chakra-ui/react";

import React, { useState } from "react";

import { BiX } from "react-icons/bi";
import { MdPictureAsPdf } from "react-icons/md";

// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const SharingUpload = ({
  label,
  onChange,
  generalData = {},
  setImages = () => {},
  images = [],
}) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

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
      <AtomLabel>{label ? label : "1 PDF зураг оруулах"}</AtomLabel>

      <form action="">
        <input
          type="file"
          name="upload"
          accept="application/pdf"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={onChange}
        />
      </form>
      <button
        onClick={handleClick}
        className="flex px-4 py-2 mx-auto my-3 text-white bg-blue-500 rounded-sm"
      >
        Зураг сонгох
      </button>

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
        <button className="border-2 w-full min-h-[20vh] h-full border-dotted border-blue-400 bg-blue-100/50 rounded-xl outline-none p-4 flex flex-col justify-center items-center">
          <MdPictureAsPdf size={90} className="text-blue-400" />
          <p>PDF зураг</p>
        </button>
      )}
      {/* 
        <PDFview />
        <Pdfer /> */}

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

// function Pdfer() {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Document
//         file={"../../public/testpdf.pdf"}
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// }

// const PDFview = () => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const goToPrevPage = () =>
//     setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

//   const goToNextPage = () =>
//     setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

//   return (
//     <div>
//       <nav>
//         <button onClick={goToPrevPage}>Prev</button>
//         <button onClick={goToNextPage}>Next</button>
//         <p>
//           Page {pageNumber} of {numPages}
//         </p>
//       </nav>

//       <Document file="" onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} />
//       </Document>
//     </div>
//   );
// };

export default SharingUpload;
