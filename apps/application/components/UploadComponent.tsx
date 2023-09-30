import { useProposalsContextState } from "@/contexts/ProposalsContext";
import { MediaRenderer } from "@thirdweb-dev/react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface IUploadComponentProps {
  evidence: any;
  setEvidence: any;
}

const UploadComponent = ({ evidence, setEvidence }: IUploadComponentProps) => {
  const { uploadEvidenceToIpfs } = useProposalsContextState();

  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
    // Logic for handling the dropped files
    const uploadUrl = await uploadEvidenceToIpfs(acceptedFiles[0]);
    const updatedEvidenceIpfsUrl = {
      ...evidence,
      ipfsUri: uploadUrl[0],
    };
    setEvidence(updatedEvidenceIpfsUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    // accept: "image/*, .pdf, .doc, .docx",
    multiple: false,
  });

  return (
    <div className="formFile">
      <div
        {...getRootProps()}
        className={`flex flex-col justify-center items-center pt-5 pb-6 font-exo dropzone ${
          isDragActive ? "active" : ""
        }`}
      >
        <input {...getInputProps()} />
        <svg
          aria-hidden="true"
          className="mb-3 w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        {isDragActive ? (
          <p className="mb-2 text-sm text-white ">
            <span className="font-semibold ">Toca para elegir tu archivo</span>{" "}
            o arrastralo y suelta aquí
          </p>
        ) : (
          <p>Drag and drop file here or click to browse</p>
        )}
      </div>

      <div className="flex flex-col justify-center items-center pt-5 pb-6 ">
        <h3>Uploaded File:</h3>
        {evidence.ipfsUri !== "" ? (
          <MediaRenderer height="55px" width="55px" src={evidence.ipfsUri} />
        ) : (
          <p>No file uploaded</p>
        )}
      </div>
    </div>
  );
};

export default UploadComponent;
