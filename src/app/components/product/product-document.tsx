import styled from "styled-components";
import { IDocument } from "../../types";

const DocumentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Text = styled.span`
  margin-top: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 130%;
  color: #000;
`;

const OpenLink = styled.span`
  margin-top: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 130%;
  color: #000;
  opacity: 0.7;
  cursor: pointer;
`;

interface IProductDocumentProps {
  document: IDocument;
  number: number;
}

export const ProductDocument = ({
  document,
  number,
}: IProductDocumentProps) => {
  const handleDocumentOpen = () => {
    window.open(`/static/${document.file}`, "_blank");
  };

  return (
    <DocumentContainer>
      <Text>{`${number}. ${document.name}`}</Text>
      <OpenLink onClick={handleDocumentOpen}>Открыть</OpenLink>
    </DocumentContainer>
  );
};
