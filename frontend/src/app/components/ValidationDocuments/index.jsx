
import { Box } from "@mui/material";
import ValidationDocumentCard from "../ValidationDocumentCard";

const ValidationDocuments = (props) => {
    return (
        <>
            {
				props.card.length > 0 &&
				<Box sx={{ display: 'flex', flexWrap: "wrap", alignItems: 'center', justifyContent: 'flex-start', }}>
					{props.card.map((card, index) => (
					    <ValidationDocumentCard
						    src_img={card.src_img}
							name={card.name}
							description={card.description}
							unit={card.unit}
							major={card.major}
							key={index}
							path='/document/'
							dateUploaded={card.dateUploaded}
							linkView={card.linkView}
							docID={card.docID} />
					))}
				</Box>
			}
        </>
    );
};

export default ValidationDocuments;