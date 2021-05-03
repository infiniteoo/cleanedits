import http from "../http-common";
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid';
import React from "react";

const upload = (file, email, onUploadProgress) => {
  
  let formData = new FormData();
  // add email to formdata
  formData.append("file", file);
  formData.append("text", email);
  console.log("formData",formData)

  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return http.get("/files");
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService; 
