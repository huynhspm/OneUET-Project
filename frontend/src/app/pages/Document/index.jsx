import Header from "../../containers/Header";
import { useParams } from "react-router-dom";

const Document = (props) => {

    const { doc_id } = useParams();

    const doc_ids = [
        '1pRHDGYar6n85cSndPP0XYuBKNcBlqEqd',
        '1nbtRZC4EdNUBgloyM8MoPcmk93ipC94i'
    ]

    return (
        <>
            {/* {card.doc_ids((card, index) => (
                // { doc_id === '1pRHDGYar6n85cSndPP0XYuBKNcBlqEqd' && <Header />}
            ))} */}
        </>
    );
};