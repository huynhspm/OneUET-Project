import Header from "../../containers/Header";
import { useParams } from "react-router-dom";
import EditDocumentView from "../EditDocumentPage/Main";
import DocumentView from "./DocumentView";
import Main from "./Main";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ValidationGrade from "../../ValidationGrade";

const ValidationGradeView = (props) => {
  return (
    <>
      <ValidationGrade props />
    </>
  );
};

export default Document;
