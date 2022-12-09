import DocumentCard from "../DocumentCard";
import './styles.css'
export default function HorizontalDocumentList(props) {
	// props have data is a list of DocumentCard, height each card
	const CardList = props.data.map((item) => (<DocumentCard height={props.height} src_img={item.src_img} link={item.link} name={item.name} description={item.description}/>))
	return (
		<div className="card_list">
			{CardList}
		</div>
	);
}
